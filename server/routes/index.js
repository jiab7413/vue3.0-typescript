var express = require('express');
var router = express.Router();
var Mysql = require('./mysqlDB');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

/**
 * login页面
 */
/**
 * 加密和解密crypto方法
 * @param data
 * @param key
 */
/**
 * 加密
 * @param data
 * @param key
 */
function aesEncrypt(data, key) {
    var cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

/**
 * 解密
 * @param encrypted
 * @param key
 * @returns {*}
 */
function aesDecrypt(encrypted, key) {
    var decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


/**
 * 注册校验接口
 * true代表该用户未注册
 * false代表该用户未注册
 */
router.post('/api/verification',function(req,res){
    var data = {}
    var obj = {
        username:req.query.username
    };
    if(obj.username === ''){
        res.json('用户名不能为空')
    }else{
        Mysql.query('select * from loginList where username = \''+obj.username+'\'',function(result){
            if(result.length >= 1){
                data.msg = '';
                data.code = null;
                data.data = [];
                data.msg = '该用户已注册';
                data.code = 0;
                res.json(data)
            } else {
                data.code = 1;
                res.json(data)
            }
        })
    }
})


/**
 * 注册接口
 * INSERT INTO loginlist (ID,USERNAME,PASSWORD) VALUES (5,'superman','A12345678')
 */
router.post('/api/newlyAdded',function(req,res){
    var data = {};
    var obj = {
        username:req.query.username,
        password:req.query.password
    };
    if(obj.username !== ''){
        if(obj.password !== ''){
            /**
             * token设置
             * @type {{username: string, password: string}}
             */
            var header={
                "alg": "HS256",
                "typ": "JWT"
            };
            /**
             * Token 数据写法
             * @type {{iat: number, name: string, admin: boolean}}
             */
            var payload = {
                iat: 1529033906,
                name: obj.username,
                admin: true
                // exp: 1529120306
            };
            /**
             * 密钥配置
             * expiresIn：设置失效时间
             * @type {string}
             */
            var secret = 'ILOVENINGHAO';
            /**
             * 签发 Token
             * @type {PromiseLike<ArrayBuffer>}
             */
            var token = jwt.sign(payload, secret, { expiresIn: '1day' });
            /**
             * 加密密码
             * @type {string}
             */
            var datas = obj.password;
            var key = 'password';
            var encrypted = aesEncrypt(datas, key);
            Mysql.query('INSERT INTO loginlist (USERNAME,PASSWORD,TOKEN) VALUES (\''+obj.username+'\',\''+encrypted+'\',\''+token+'\')',function(result){
                if(result.affectedRows===1){
                    data.msg = '';
                    data.msg = '注册成功';
                    data.code = 0;
                    res.json(data)
                }
            })
        }else{
            data.msg = '';
            data.msg = '密码不能为空';
            res.json(data)
        }
    }else{
        data.msg = '';
        data.msg = '用户名不能为空';
        res.json(data)
    }
});

/**
 * 登录接口
 * select * from loginList where username = 'admin'
 */
router.post('/api/polling', function(req, res) {
    var data = {};
    var obj = {
        username: req.query.username,
        password: req.query.password,
    };
    if(obj.username === ''){
        res.json('用户名不能为空')
    }else{
        if(obj.password === ''){
            res.json('密码不能为空')
        }else{
            Mysql.query('select * from loginList where username = \''+obj.username+'\'',function(result){
                if(result.length >= 1){
                    var encrypted =result[0].password;
                    var key = 'password';
                    var decrypted = aesDecrypt(encrypted, key);
                    if(decrypted === obj.password){
                        data.msg = '登录成功';
                        data.data = result;
                        data.token = result[0].token;
                        res.json(data)
                    }
                }else{
                    data.msg = '';
                    data.msg = '未查取到该用户';
                    res.json(data)
                }
            })
        }
    }
});

/**
 * 注销用户接口
 * DELETE FROM loginlist WHERE username = 'superman'
 */
router.get('/api/strikeOut',function(req,res){
    var obj = {
        id:1,
        username:'admin'
    };
    if(obj.id === null){
        return
    }else{
        if(obj.username === ''){
            res.json('用户名不能为空')
        }else{
            Mysql.query('DELETE FROM loginlist WHERE username = \''+obj.username+'\'',function(result){
                if(result.affectedRows===1){
                    res.json('成功注销')
                }
            })
        }
    }
});

/**
 * 修改密码
 * UPDATE loginlist SET `password` = 'Ad123456' WHERE id = 2（唯一值），修改一个
 * UPDATE loginlist SET username = 'admins', `password` = 'Ad123456' WHERE id = 2，修改多个
 */
router.get('/api/revise',function(req,res){
    var obj = {
        id:3,
        username:'admin',
        password:'Ad123456'
    };
    if(obj.id === null){
        return
    }else{
        if(obj.username === ''){
            res.json('用户名不能为空')
        }else{
            if(obj.password === ''){
                res.json('密码不能为空')
            }else{
                /**
                 * 加密密码
                 * @type {string}
                 */
                var data = obj.password;
                var key = 'password';
                var encrypted = aesEncrypt(data, key);
                Mysql.query('UPDATE loginlist SET username = \''+obj.username+'\',password = \''+encrypted+'\' WHERE id = \''+obj.id+'\'',function(result){
                    if(result.affectedRows===1){
                        res.json(result)
                    }else{
                        res.json('修改失败')
                    }
                })
            }
        }
    }
});

module.exports = router;
