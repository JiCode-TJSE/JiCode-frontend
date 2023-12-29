<template>
    <el-container class="projectContainer">
        <el-header class="header">
            <div>
                <el-icon color="#87CEFA" size="30">
                    <SwitchFilled />
                </el-icon>
                <span>&nbsp;&nbsp;&nbsp;项目管理</span>
            </div>
            <!--用抽屉Drawer写帮助文档-->
            <!--还有Tooltip文字提示，可用性-->
            <el-button type="help" @click="helplog" :icon="QuestionFilled" circle />
        </el-header>
        <el-container>
            <el-header>
                <ProjectTopBar :selectedMenu="selectedMenu" @MenuSelect="handleSelect" />
            </el-header>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
/* eslint-disable */
import ProjectTopBar from "@/components/project/ProjectTopBar.vue"
import {
    SwitchFilled,
    QuestionFilled,
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute(); // 获取路由对象
const router = useRouter();
// 使用路由参数
const selectedMenu = ref(route.params.selected || 'allProject');
//默认进去就是全部项目
router.push({ name: 'allProject' });
//点击菜单项事件：
const handleSelect = (val) => {
    selectedMenu.value = val.item;
    router.push({ name: val.item });
}

</script>

<style scoped>
.projectContainer {
    flex: 1;
    height: 100%;
    width: 87%;
    position: absolute;

}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: larger;
}
</style>