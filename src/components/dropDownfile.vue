<template>
    <el-dropdown trigger="click">
      <el-button class="el-dropdown-link" type="primary">
        操作<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
    import { Vue } from 'vue-property-decorator'
    export default class DropDownfile extends Vue {

    }
</script>

<style scoped>

</style>