<template>
    <el-container>
        <el-header>
            <TopBar :default-active="selectedMenu" selectedMenu="selectedMenu" @MenuSelect="handleSelect" />
        </el-header>
        <el-main class="main">
            <RouterView />
        </el-main>
    </el-container>
</template>

<script setup>
/* eslint-disable */
import TopBar from '@/components/project/TopBar.vue';
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';


const route = useRoute(); // 获取路由对象
const router = useRouter();
// 使用路由参数
const selectedMenu = ref(route.params.selected || 'overview');

//点击菜单项事件：
const handleSelect = (val) => {
    selectedMenu.value = val.item;
    router.push({ name: val.item });
}
</script>

<style scoped></style>
  