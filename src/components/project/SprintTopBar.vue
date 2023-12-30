<template>
    <el-row class="row">
        <el-col :span="18">
            <el-menu :default-active="selectedMenu" class="topBar" mode="horizontal" active-text-color="#79bbff"
                @select="MenuSelect">
                <el-menu-item index="allSprint">全部迭代</el-menu-item>
                <el-menu-item index="normalSprint">正常迭代</el-menu-item>
                <el-menu-item index="temporarySprint">临时迭代</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="6">
            <el-button class="addSprint" type="primary" @click="dialogFormVisible = true"><el-icon>
                    <Plus />
                </el-icon>新建迭代</el-button>
        </el-col>
        <el-divider /> <!-- 添加水平分割线 -->
    </el-row>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { reactive, computed } from 'vue'
import { defineEmits } from 'vue' //子组件传值给父组件
import { defineProps } from 'vue' //子组件接收来自父组件的值



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
.topBar {
    margin-top: 10px;
    border-bottom: none;
    /* 删除水平分割线 */
}

.addSprint {}
</style>