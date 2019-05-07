<template>
    <div class="main">
        <div class="main_top">
            <div class="main_top_left">log</div>
            <div class="main_top_right">用户</div>
        </div>
        <div class="main_content">
            <div class="left">
                <el-row>
                    <el-col :span="12">
                        <el-menu
                                default-active="用户管理"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="#545c64"
                                text-color="#fff"
                                active-text-color="#ffd04b">
                            <el-submenu index="系统管理">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>系统管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="用户管理">用户管理</el-menu-item>
                                    <el-menu-item index="角色管理">角色管理</el-menu-item>
                                    <el-menu-item index="部门管理">部门管理</el-menu-item>
                                    <el-menu-item index="审核管理">审核管理</el-menu-item>
                                    <el-menu-item index="权限管理">权限管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="日志管理">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">日志管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="行为日志">行为日志</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div class="right">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({})
    export default class Main extends Vue {
        private handleOpen(key: any, keyPath: any[]) {
            console.log(key, keyPath);
        }
        private handleClose(key: any, keyPath: any[]) {
            console.log(key, keyPath);
        }
    }
</script>

<style scoped>
    .main_top_left{
        float: left;
        color:#fff;
        height:5vh;
        line-height: 5vh;
    }
    .main_top_right{
        float: right;
        height:5vh;
        line-height: 5vh;
        color:#fff;
    }
    .main_top{
        overflow: hidden;
        height:5vh;
        background: #ccc;
        padding-right:2vh;
    }
    .main_content{
        overflow: hidden;
        height:95%;
    }
    .main{
        height: 100%;
    }
    .left{
        float: left;
        width:14%;
        height:100%;
    }
    .right{
        float: right;
        width:86%;
        height:100%;
    }
</style>