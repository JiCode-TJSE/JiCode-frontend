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
                <ProjectTopBar />
            </el-header>
            <el-main>
                <AllProject />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import AllProject from "@/components/project/AllProject.vue"
import ProjectTopBar from "@/components/project/ProjectTopBar.vue"
import {
    SwitchFilled,
    QuestionFilled,
} from '@element-plus/icons-vue'
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