<template>
    <div class="login">
        <img src="@/assets/login_bg.jpg">
        <div class="suspension_model">
            <div class="login_content">
                <div class="login_content_top">
                    <span>登录</span>
                </div>
                <div class="login_content_cen">
                    <div class="login_content_cen_page">
                        <div class="login_content_user">
                            <label>用户名</label><input type="text" placeholder="请输入用户名" v-model="username" @keyup="loginUserChange"/>
                        </div>
                        <div class="login_content_pass">
                            <label>密&nbsp;&nbsp;码</label><input type="password" placeholder="请输入密码" v-model="password" @keyup="loginPassChange"/>
                        </div>
                        <div class="login_content_register">
                            <span class="forget">忘记密码？</span>
                            <span @click="registerPage">没有账号？立即注册</span>
                        </div>
                    </div>
                </div>
                <div class="login_content_bot">
                    <button class="login_button" @click="loginButton">登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Watch, Vue } from 'vue-property-decorator';
    import { Getter, Action } from 'vuex-class';
    @ Component({})
    export default class Login extends Vue {
        username: string = '';
        password: string = '';
        @Getter private success: any;
        @Action private SEARCH_LOGIN_DATA!: any;
        get successChange() {
            return this.success
        }
        @Watch('success')
        successChanges() {
            alert(this.successChange)
            if (this.successChange === '登录成功') {
                this.$router.push('/')
            }
            if (this.successChange === '密码错误') {
                this.username = '';
                this.password = ''
            }
            if (this.successChange === '未查取到该用户') {
                this.username = '';
                this.password = ''
            }
        }
        private registerPage() {
            this.$router.push('/register')
        }
        private loginUserChange() {
            if (this.username.indexOf(' ') === -1) {
                return this.username;
            } else {
                alert('不能输入空格!');
                this.username = ''
            }
        }
        private loginPassChange() {
            if (this.password.indexOf(' ') === -1) {
                return this.password;
            } else {
                alert('不能输入空格!');
                this.password = ''
            }
        }
        private param() {
            let params: any;
            let tokens = localStorage.getItem("TOKEN");
            if (this.username !== '' && this.password !== '' && tokens !== '') {
                params = {
                    username: this.username,
                    password: this.password,
                    token: tokens
                }
            }
            return params
        }
        private loginButton() {
            this.SEARCH_LOGIN_DATA(this.param())
        }
    }
</script>

<style scoped>
    .login{
        height:100%;
        width:100%;
        position: relative;
    }
    .suspension_model{
        width:100%;
        height:100%;
        position: absolute;
        top:0;
    }
    .login_content{
        background: #fff;
        width:25%;
        height:36%;
        margin:10% auto;
    }
    .login_content_top{
        background: #ccc;
        padding:1.3vh 0;
        text-align: center;
        font-size:1.2vw;
    }
    .login_content_cen{
        text-align: center;
        padding:3vh 0;
    }
    .login_content_pass{
        margin:3vh 0;
    }
    .login_content_cen_page{
        padding:0 4vw;
    }
    .login_content_cen_page label{
        width:18%;
        display: inline-block;
        font-size:1vw;
        text-align: right;
        margin-right: 1vw;
    }
    .login_content_cen_page input{
        width:74%;
        height:4vh;
        line-height: 4vh;
        text-indent: 1vh;
    }
    .login_content_bot{
        text-align: center;
    }
    .login_content_bot button{
        outline: 0;
        padding:0.7vh 1.2vw;
        font-size: 1vw;
        cursor: pointer;
    }
    .login_button{
        margin-right:1vw;
        background: aqua;
        border: aqua;
    }
    .login_content_register{
        overflow: hidden;
    }
    .login_content_register span{
        display: block;
        float: right;
        color:#ccc;
        font-size: 0.7vw;
        cursor: pointer;
    }
    .login_content_register span:hover{
        color:cyan;
    }
    .login_content_register .forget{
        float: left;
    }
</style>