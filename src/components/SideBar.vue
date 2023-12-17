<template>
    <el-container>
        <el-header class="header">

            <el-icon size="45">
                <ElementPlus />
            </el-icon>
            <span>
                {{ info.userName }}
            </span>

        </el-header>

        <el-main class="sidebar">

            <el-menu class="menu" active-text-color="#79bbff" background-color="#393f44" text-color="white"
                :default-active="selectedMenu" @select="MenuSelect">
                <el-menu-item index="workBench">
                    <span>
                        <el-icon>
                            <HomeFilled />
                        </el-icon>
                        <span>工作台</span>
                    </span>
                </el-menu-item>
                <el-menu-item index="projectManage">
                    <span>
                        <el-icon><icon-menu /></el-icon>
                        <span>项目管理</span>
                    </span>

                </el-menu-item>
                <el-menu-item index="productManage">
                    <span>
                        <el-icon>
                            <Coin />
                        </el-icon>
                        <span>产品管理</span>
                    </span>
                </el-menu-item>
                <el-menu-item index="accountSet">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>账号设置</span>
                </el-menu-item>
                <el-menu-item index="appMarket">
                    <el-icon>
                        <Shop />
                    </el-icon>
                    <span>应用市场</span>
                </el-menu-item>
            </el-menu>
        </el-main>
    </el-container>
</template>

<script setup>
import {
    Coin,
    Menu as IconMenu,
    HomeFilled,
    Setting,
    ElementPlus,
    Shop,
} from '@element-plus/icons-vue'
import { reactive, computed } from 'vue'
import store from '@/store';
import { defineEmits } from 'vue' //子组件传值给父组件
import { defineProps } from 'vue' //子组件接收来自父组件的值

/* eslint-disable */


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
//用户角色：buyer/seller
//const role = store.state.user.role;//"seller"或"buyer"
</script>

<style scoped>
.header {
    width: 100%;
    color: white;
    background-color: #393f44;
    padding-top: 30px;
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: larger;
}

.sidebar .menu {

    width: 195px;
}

.sidebar {

    width: 13%;
    /*元素的高度设置为视口高度的百分比，填满整个网页*/
    margin-top: 5%;
    height: 100%;
    background-color: #393f44;
    position: fixed;
    padding-left: 0%;
    padding-top: 25px;
}
</style>