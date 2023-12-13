<template></template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import { useRoute } from 'vue-router';
const route = useRoute(); // 获取路由对象
// 点击菜单项事件：
const handleSelect = (val) => {
    selectedMenu.value = val.item;
}
const title = ref({
    'workBench': '工作台',
    'projectManage': '项目管理',
    'productManage': '产品管理',
    'accountSet': '账号设置',
    'backstage': '管理后台',
    'appMarket': '应用市场'
})

</script>

<style scoped></style>