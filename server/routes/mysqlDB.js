/**
 * 连接数据库，引入sql包
 * @type {*}
 */
var Mysql = require('mysql');

/**
 * 定义一个db空对象
 * @type {{}}
 */
var db = {};
/**
 * 赋予db对象query方法，两个参数，第一个sql语句，第二个为回调函数
 * @param sqllan
 * @param fn
 */
db.query = function sqlback(sqllan,fn){
    //连接库
    var connection = Mysql.createConnection({
        host:'localhost',//连接地址
        user:'root',//用户名
        password:'root',//用户密码
        database:'project',//选择库的操作名
        port:'3397'//端口号
    });
    connection.connect(function(err){
        if(err){
            return
        }
    });
    var sql = sqllan
    if(!sql)return
    /**
     * *调用connection的query方法直接向数据库发送sql语句，并把用回调函数接收返回结果，其回调函数共返回三个参数，第一个为错误信息，第二个为返回结果，第三个经常不写
     * 回调函数第一个参数为err，为错误对象，如果操作失败则打印错误信息
     * 第二个参数为返回结果，是json类型
     * 第三个参数返回对应的数据库及表
     */
    connection.query(sql,function(err,rows){
        if(err){
            return
        }
        fn(rows)
    });
    /**
     * 数据库连接结束关闭连接
     */
    connection.end(function(err){
        if(err){
            return
        }else{
            console.log('连接关闭')
        }
    })
}

module.exports = db