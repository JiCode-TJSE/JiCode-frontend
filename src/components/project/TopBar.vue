<template>
    <el-col>
        <span>
            <br><br>&nbsp;&nbsp;&nbsp;敏捷开发项目
        </span>
    </el-col>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="MenuSelect">

        <el-menu-item index="overview">概览</el-menu-item>
        <el-menu-item index="requirement">需求</el-menu-item>
        <el-menu-item index="sprint">迭代</el-menu-item>
        <el-menu-item index="publish">发布</el-menu-item>
        <el-menu-item index="setting">设置</el-menu-item>
    </el-menu>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { reactive, computed } from 'vue'
import { defineEmits } from 'vue' //子组件传值给父组件
import { defineProps } from 'vue' //子组件接收来自父组件的值

const activeIndex = ref('1')

const info = reactive({
    userName: computed(() => {
        return store.state.user.username;
    })
})
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

<style scoped></style>