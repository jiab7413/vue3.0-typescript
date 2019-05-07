<template>
    <el-button type="primary" @click="Byval">{{buttonVal.text}}</el-button>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    @Component
    export default class Buttonfile extends Vue {
        @Prop() private buttonVal!: any;
        private Byval() {
            this.$emit('searchQuery')
        }
    }
</script>

<style scoped>

</style>