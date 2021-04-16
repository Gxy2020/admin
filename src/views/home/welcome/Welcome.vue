<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <cards></cards>
</div>
</template>

<script>
    import Cards from "./cards/Cards";
    export default {
        name: "Welcome",
        components:{
            Cards
        }
    }
</script>

<style scoped>

</style>
