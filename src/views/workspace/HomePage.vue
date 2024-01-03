<template>
    <div class="container">
      <div class="user-info">
        <div class="icon-circle">WE</div>
        <div class="text-content">
          <p class="name">{{ username }}, 你好呀~</p>
          <p class="date">{{ currentDate }}</p>
        </div>
      </div>
      <el-card class="item-card">
      <el-row>
        
        <h2 class="title">待完成事项</h2>
      </el-row>
       
      <el-row :gutter="20" class="search-and-filter">
        <el-col :span="8">
          <el-input
            placeholder="搜索 (Ctrl+G)"
            prefix-icon="el-icon-search"
            v-model="searchText"
            class="search-input">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="selectedFilter"
            placeholder="筛选"
            class="filter-select">
            <el-option label="全部" value="all"></el-option>
            <el-option label="工作项" value="工作项"></el-option>
            <el-option label="用户需求" value="用户需求"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div v-for="item in filteredItems" :key="item.id" class="list-item">
        <span :class="['icon', item.typeColor]">{{ item.prefix }}</span>
        <span class="content">{{ item.name }}</span>
        <span class="action">{{ item.product_name }}</span>
      </div>
    </el-card>
    </div>
    
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  import { getUserInfoRequest } from '@/api/account.js'
  //import { getProjectInfoRequest} from '@/api/request1.js'
  import { getProductInfoRequest} from '@/api/workspace.js'
  import { ElMessage } from 'element-plus';
  import { useStore } from 'vuex';

  
  
  export default {
    setup() {
    // 获取 Vuex store 实例
    const store = useStore();

    // 计算属性，用来获取 account_id
    const account_id = computed(() => store.state.user.account_id);
    const username = ref('');
    const currentDate = ref(getCurrentDate());
    const searchText = ref('');
    const selectedFilter = ref('all');
    const items = ref([]); // 初始化为空数组

    // 从后端API获取数据的函数
    const fetchItems = async () => {
        try {
    // 获取第一个接口的数据
    const response = await getProductInfoRequest('1');//account_id.value
    let allItems = []; // 用于存储合并后的数据

    if (response.code === 200 && Array.isArray(response.data.showingDatas)) {
      const itemsFromResponse = response.data.showingDatas.map(item => ({
        type: item.type,
        typeColor: getTypeColor(item.type),
        prefix: getTypeCode(item.type),
        name: item.item_name,
        product_name: item.product_name
      }));
      allItems = allItems.concat(itemsFromResponse); // 合并数据
      ElMessage({
        type: 'success',
        message: response,//response.msg,//'成功获取产品信息',
      });
    } else {
      ElMessage({
        type: 'error',
        message: response.msg,//'获取产品信息失败',
      });
    }

    // 获取第二个接口的数据
   /* const response1 = await getProjectInfoRequest(account_id.value);

    if (response1.code === 200 && Array.isArray(response1.data)) {
      const itemsFromResponse1 = response1.data.map(item => ({
        type: item.type,
        typeColor: getTypeColor(item.type),
        prefix: getTypeCode(item.type),
        name: item.item_name,
        product_name: item.project_name
      }));
      allItems = allItems.concat(itemsFromResponse1); // 继续合并数据
      ElMessage({
        type: 'success',
        message: '成功获取项目信息',
      });
    } else {
      ElMessage({
        type: 'error',
        message: '获取项目信息失败',
      });
    }*/

    items.value = allItems; // 设置最终的合并后的数据
  } catch (error) {
    ElMessage({
      type: 'error',
      message: 'An error occurred during items data retrieval',
    });
    console.error('Failed to fetch items:', error);
  }
};

    // 根据项目类型获取颜色的函数
    const getTypeColor = (type) => {
      switch (type) {
        case '工作项':
          return 'blue';
        case '功能需求':
          return 'yellow';
        case '体验优化':
          return 'orange'
        case '安全需求':
          return 'red'
        case '技术需求':
          return 'green';
        // 添加更多的类型和颜色对应
        default:
          return 'white';
      }
    };

    // 根据项目类型获取颜色的函数
    const getTypeCode = (type) => {
      switch (type) {
        case '工作项':
          return '工作项';
        case '功能需求':
          return '功能需求';
        case '体验优化':
          return '体验优化';
        case '安全需求':
          return '安全需求';
        case '技术需求':
          return '技术需求';
          
        // 添加更多的类型和颜色对应
        default:
          return '无';
      }
    };

    onMounted(fetchItems); // 在组件挂载时调用fetchItems

    

      onMounted(async () => {
        fetchItems
        try {
          const response = await getUserInfoRequest(account_id.value);
          if (response.code == 200) {
            const userData = response.data;
            username.value = userData.userName;
            ElMessage({
              type: 'success',
              message: 'User data fetched successfully',
            });
          } else {
            ElMessage({
              type: 'error',
              message: response.msg,
            });
          }
        } catch (error) {
          ElMessage({
            type: 'error',
            message: 'An error occurred during user data retrieval',
          });
          console.error('Error:', error);
        }
      });
  
      function getCurrentDate() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return now.toLocaleDateString('zh-CN', options);
      }
  
      setInterval(() => {
        currentDate.value = getCurrentDate();
      }, 60000);
  
      const filteredItems = computed(() => {
        return items.value
          .filter(item => item.name.includes(searchText.value))
          .filter(item => {
          if (selectedFilter.value === 'all') {
            return true; // 如果选中“全部”，则不过滤
          } else if (selectedFilter.value === '用户需求') {
        // 如果选中“用户需求”，则过滤出以下四类项
        return ['功能需求', '体验优化', '安全需求', '技术需求'].includes(item.type);
     } else {
        return item.type === selectedFilter.value; // 其他情况按照选中的类型过滤
      }
    });
});
  
      return {
        username,
        currentDate,
        searchText,
        selectedFilter,
        filteredItems,
        items,
      fetchItems // 如果你想要在模板中手动触发更新
      };
      
    },
  };
  </script>

  <style scoped>
  .item-card{
    width:1000px;
    margin:0 auto;
    height: 500px; /* 您可以设置为想要的高度 */
  overflow-y: auto; /* 设置垂直方向的滚动条 */
  }
  .title{
    margin-left:50px;
    margin-top:20px;
    margin-bottom: 50px;
  }
  .container{
    margin-top:50px;
  }
  .row1{
    margin-top:50px;
    
  }
  .search-input{
    width:200px;
    margin-left:0px;
    margin-bottom: 20px;
  }
  .list-container {
  /* 添加必要的样式 */
  margin-left: 30px;
  width:800px;
  margin: 0 auto; 
}

.list-item {
  display: flex;
  align-items: center;
  width:820px;
  margin: 0 auto;
  margin-bottom: 10px; /* 或根据您的布局调整 */
  padding: 10px;
  border-bottom: 1px solid #ccc; /* 如果需要分割线 */
}

.icon {
  display: inline-block;
  width: 80px; /* 调整大小 */
  height: 20px; /* 调整大小 */
  line-height: 20px; /* 垂直居中文本 */
  text-align: center;
  border-radius: 4px; /* 圆角 */
  color: white; /* 图标文字颜色 */
  margin-right: 10px; /* 图标和内容之间的距离 */
}


.blue {
  background-color: #007bff; /* 蓝色图标背景 */
}

.green {
  background-color: #28a745; /* 绿色图标背景 */
}

.red {
  background-color: #dc3545; /* 红色图标背景 */
}

.yellow {
  background-color: orchid; /* 红色图标背景 */
}

.orange {
  background-color: orange; /* 红色图标背景 */
}

.white{
  background-color: yellow; /* 红色图标背景 */
}

.content {
    margin-left: 5px; 
}

.action {
  white-space: nowrap; /* 防止换行 */
  margin-left: auto;
  /* 添加其他必要的样式 */
}
  .el-input {
  margin-bottom: 20px; /* 添加一些间隔 */
}

.el-select {
  margin-bottom: 20px; /* 添加一些间隔 */
}

.el-list-item {
  border-bottom: 1px solid #efefef; /* 添加分割线 */
  line-height: 2.5em; /* 调整行高 */
}

.el-tag {
  margin-right: 10px; /* 标签与文本之间的间隔 */
}
  .user-info {
    display: flex;
    align-items: center;
    margin-left:50px;
    margin-top:50px;
    margin-bottom:50px;
  }
  
  .icon-circle {
    width: 50px; /* 圆圈的大小 */
    height: 50px;
    border-radius: 50%; /* 使其成为圆形 */
    background-color: #A5D6A7; /* 圆圈的背景色 */
    color: white; /* 文字颜色 */
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold; /* 文字加粗 */
    margin-right: 10px; /* 与文字内容的间距 */
  }
  
  .text-content .name {
    margin: 0;
    font-size: 1em; /* 可根据需要调整大小 */
  }
  
  .text-content .date {
    margin: 0;
    font-size: 0.8em; /* 日期的字体比姓名小一些 */
    color: #666; /* 日期文字的颜色 */
  }
  </style>
  