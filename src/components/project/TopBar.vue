<template>
    <el-row align="middle" class="header">
        <el-col :span="3">
            <el-icon size="40" color="#409EFC">
                <Flag />
            </el-icon>
            <span>敏捷开发项目</span>
        </el-col>
        <el-col :span="21">
            <el-menu :default-active="activeIndex" mode="horizontal" border-bottom:="none" @select="MenuSelect">

                <el-menu-item index="overview">概览</el-menu-item>
                <el-menu-item index="projectRequirement">需求</el-menu-item>
                <el-menu-item index="sprint">迭代</el-menu-item>
                <el-menu-item index="publish">发布</el-menu-item>
                <el-menu-item index="setting">设置</el-menu-item>
            </el-menu>

        </el-col>

    </el-row>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { reactive, computed } from 'vue'
import { defineEmits } from 'vue' //子组件传值给父组件
import { defineProps } from 'vue' //子组件接收来自父组件的值
import { Flag } from '@element-plus/icons-vue'
const activeIndex = ref('1')

// 接受来自父组件的初始菜单项
const props = defineProps({
    selectedMenu: String, //模板template可直接使用
})

const emit = defineEmits(['MenuSelect']);//定义传值给父组件的方法

// 菜单项选择响应函数
const MenuSelect = (value) => {
    props.selectedMenu = value;

    //传给父组件的数据
    let param = {
        item: value //字段名可以自定义 
    }
    //传递给父组件
    emit('MenuSelect', param);
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    font-size: larger;
    color: #409EFC;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
    border-bottom: none;
    /* 删除水平分割线 */
}
</style>