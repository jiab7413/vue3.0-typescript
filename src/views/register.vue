<template>
    <div class="register">
        <img src="@/assets/login_bg.jpg">
        <div class="suspension_model">
            <div class="register_content">
            <div class="register_content_top">
                <span>注册</span>
            </div>
            <div class="register_content_cen">
                <div class="register_content_cen_page">
                    <div class="register_content_user">
                        <label>用户名</label><input type="text" placeholder="请输入用户名" v-model="username" @keyup="userChange" @blur="changename"/>
                    </div>
                    <div class="register_content_pass">
                        <label>密&nbsp;&nbsp;码</label><input type="password" placeholder="请输入密码" v-model="password" @keyup="passChange"/>
                    </div>
                </div>
            </div>
            <div class="register_content_bot">
                <button class="register_button" @click="registerButton">注册</button>
            </div>
            <div class="returnLogin">
                <span @click="returnLogins">返回登录</span>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
@Component({})
export default class Register extends Vue {
    username: string = '';
    password: string = '';
    @Action private EXAMINE_REGISTER_DATA!: any;
    @Action private SET_REGISTER_DATA!: any;
    @Getter private success: any;
    @Getter private code: any;
    // computed
    get successChange() {
        return this.success
    }
    get codeChange() {
        return this.code
    }
    @Watch('success')
    private successChanges() {
        if (this.successChange !== '') {
            alert(this.successChange);
            if (this.successChange === '注册成功') {
                this.$router.push('/')
            }
        }
    }
    @Watch('code')
    private codeChanges() {
        if (this.codeChange === 0) {
            if (this.$store.state.success !== '') {
                this.username = '';
                this.password = '';
                this.$store.state.code = null;
                this.$store.state.success = ''
            }
        }
    }
    // 注册按钮
    private registerButton() {
        if (this.param() !== undefined) {
            if (this.codeChange === 1) {
                this.SET_REGISTER_DATA(this.param());
            }
        } else {
            alert('不能输入空值')
        }
    }
    private changename() {
        if (this.username !== '') {
            this.EXAMINE_REGISTER_DATA({username: this.username});
        }
    }
    private param() {
        let param: any;
        if (this.username !== '' && this.password !== '') {
           param = {
                username: this.username,
                password: this.password
            };
        }
        return param
    }
    // 用户名
    private userChange() {
        if (this.username.indexOf(' ') === -1) {
            return this.username;
        } else {
            alert('不能输入空格!');
            this.username = ''
        }
    }
    // 密码
    private passChange() {
        if (this.password.indexOf(' ') === -1) {
            return this.password
        } else {
            alert('不能输入空格!');
            this.password = ''
        }
    }
    private returnLogins() {
        this.$router.push('/login')
    }
}
</script>

<style scoped>
    .register{
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
    .register_content{
        background: #fff;
        width:25%;
        height:36%;
        margin:10% auto;
    }
    .register_content_top{
        background: #ccc;
        padding:1.3vh 0;
        text-align: center;
        font-size:1.2vw;
    }
    .register_content_cen{
        text-align: center;
        padding:3vh 0;
    }
    .register_content_pass{
        margin:3vh 0;
    }
    .register_content_cen_page{
        padding:0 4vw;
    }
    .register_content_cen_page label{
        width:18%;
        display: inline-block;
        font-size:1vw;
        text-align: right;
        margin-right: 1vw;
    }
    .register_content_cen_page input{
        width:74%;
        height:4vh;
        line-height: 4vh;
        text-indent: 1vh;
    }
    .register_content_bot{
        text-align: center;
    }
    .register_content_bot button{
        outline: 0;
        padding:0.7vh 1.2vw;
        font-size: 1vw;
        cursor: pointer;
    }
    .register_button{
        margin-right:1vw;
        background: aqua;
        border: aqua;
    }
    .returnLogin{
        text-align: right;
        padding-right: 1vh;
    }
    .returnLogin span{
        font-size: 0.75vw;
        cursor: pointer;
        color: #ccc;
    }
    .returnLogin span:hover{
        color:aqua;
    }
</style>