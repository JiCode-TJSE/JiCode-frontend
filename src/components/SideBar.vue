<template>
    <!-- 顶部组织名称+图标 -->
    <el-container>

        <el-aside width="195px" height="100%">

            <el-row class="header">
                <el-icon size="45">
                    <ElementPlus />
                </el-icon>
                <span>
                    <!-- {{ info.userName }} -->
                    王琳的公司
                </span>
            </el-row>

            <!--to do：侧边栏可以隐藏-->
            <!-- <button @click="toggleSidebar">Toggle Sidebar</button> -->

            <el-menu class="sidebar" active-text-color="#ffd04b" background-color="#545c64" default-active="workBench"
                @select="MenuSelect" text-color="white"><!--给元素绑定监听器-->
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
                <el-menu-item index="aappMarket">
                    <el-icon>
                        <Shop />
                    </el-icon>
                    <span>应用市场</span>
                </el-menu-item>
            </el-menu>

        </el-aside>
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
//import { useRoute } from 'vue-router';
import { defineEmits, defineProps, ref, watch } from 'vue'

//const route = useRoute(); // 获取路由对象

// 接受来自父组件的初始菜单项
const props = defineProps({
    selectedMenu: String, //模板template可直接使用
})

const emit = defineEmits(['MenuSelect']);//定义传值给父组件的方法

const selectedMenu = ref(props.selectedMenu); // 使用 ref 创建响应式的本地属性
// 监听 props 的变化，更新本地 selectedMenu 属性
watch(() => props.selectedMenu, (newValue) => {
    selectedMenu.value = newValue;
});

// 菜单项选择响应函数
const MenuSelect = (value) => {
    selectedMenu.value = value;

    //传给父组件的数据
    let param = {
        item: value //字段名可以自定义 
    }
    //传递给父组件
    emit('MenuSelect', param);
}

</script>
  
<style>
.header {
    color: white;
    background-color: #545c64;
    padding-top: 20px;
    height: 80px;
    align-items: center;
    width: 195px;
    justify-content: center;
    font-size: larger;
}

.sidebar {
    width: 195px;
    /*元素的高度设置为视口高度的百分比，填满整个网页*/
    height: 800px;
    /* min-height: 400px; */
    background-color: #393f44;
    position: fixed;
}
</style>