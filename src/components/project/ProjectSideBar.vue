
<template>
    <el-menu class="projectSideBar" active-text-color="#79bbff" background-color="#fcfcfc" @select="subMenuSelect"
        text-color="#303133" default-active="selectedSubMenu">
        <el-row>
            <span>
                <br><br>&nbsp;&nbsp;&nbsp;项目
            </span>
        </el-row>
        <el-menu-item index="allProject">
            <span>
                <el-icon>
                    <Folder />
                </el-icon>
                <span>全部项目</span>
            </span>
        </el-menu-item>
        <el-menu-item index="orgProject">
            <span>
                <el-icon>
                    <Stamp />
                </el-icon>
                <span>组织项目</span>
            </span>

        </el-menu-item>
        <el-menu-item index="teamProject">
            <span>
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>团队项目</span>
            </span>
        </el-menu-item>
        <el-divider />
        <el-row>
            <span>
                &nbsp;&nbsp;&nbsp;工作
            </span>
        </el-row>

        <el-menu-item index="projectSet">
            <span>
                <el-icon>
                    <Files />
                </el-icon>
                <span>项目集</span>
            </span>
        </el-menu-item>
        <el-menu-item index="sizer">
            <span>
                <el-icon>
                    <ScaleToOriginal />
                </el-icon>
                <span>筛选器</span>
            </span>

        </el-menu-item>
        <el-divider />
        <el-menu-item index="setting">
            <span>

                <el-icon>
                    <Operation />
                </el-icon>
                <span>配置中心</span>
            </span>

        </el-menu-item>
    </el-menu>
</template>
  
<script setup>
import {
    Operation,
    Files,
    ScaleToOriginal,
    Folder,
    Avatar,
    Stamp,
} from '@element-plus/icons-vue'
import { defineEmits } from 'vue' //子组件传值给父组件
import { defineProps } from 'vue' //子组件接收来自父组件的值
/* eslint-disable */
console.log('All ESLint warnings in this file will be ignored');

// 接受来自父组件的初始菜单项
const props = defineProps({
    selectedSubMenu: String, //模板template可直接使用
})

const emit = defineEmits(['MenuSelect']);//定义传值给父组件的方法

// 菜单项选择响应函数
const subMenuSelect = (value) => {
    props.selectedSubMenu = value;

    //传给父组件的数据
    let param = {
        item: value //字段名可以自定义 
    }
    //传递给父组件
    emit('subMenuSelect', param);
}
</script>
  
<style scoped>
.projectSideBar {
    width: 13%;
    height: 800px;
    background-color: #e9e9eb;
    position: fixed;

}
</style>