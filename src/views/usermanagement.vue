<template>
    <div class="usermanagement">
        <Buttonfile :buttonVal="searchButton" @searchQuery="queryVal"></Buttonfile>
        <Buttonfile :buttonVal="deleButton" @searchQuery="deleteVal"></Buttonfile>
        <DropDownfile></DropDownfile>
    </div>
</template>

<script lang="ts">
    /**
     * usermanagement
     * 用户管理页面
     */
    import { Component, Emit, Vue } from 'vue-property-decorator'
    import Buttonfile from '@/components/buttonfile.vue'
    import DropDownfile from '@/components/dropDownfile.vue'
    @Component({
        components: {
            Buttonfile,
            DropDownfile
        }
    })
    export default class Usermanagement extends Vue {
        private searchButton: any = { text: '查询' };
        private deleButton: any = { text: '删除' };
        @Emit()
        private queryVal() {
            alert('查询')
        }
        private deleteVal() {
            alert('shanchu')
        }
    }
</script>

<style scoped>
    .usermanagement{
        height:100%;
    }
</style>