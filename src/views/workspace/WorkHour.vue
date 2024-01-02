<template>

    <div class="hourbody">
      <!-- 筛选区域 -->
      <el-row>
        <el-input v-model="searchText" placeholder="搜索" class="filter-input"></el-input>
      
      <el-select v-model="selectedFilter" placeholder="筛选" class="filter-select">
        <el-option label="全部" value="all"></el-option>
        <el-option label="用户故事" value="用户故事"></el-option>
      </el-select>
      <div>
        <WorkHourForm />
      </div>
      
      </el-row>
      

      <el-row class="date-row">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="date-picker"></el-date-picker>
      </el-row>
  
      <!-- 表格区域 -->
      <el-table :data="filteredItems" class="hourtable">
  <!-- 登记人列保持默认对齐（通常是左对齐） -->
  <el-table-column prop="name" label="登记人"></el-table-column>
  
  <!-- 登记时间列内容居中显示 -->
  <el-table-column prop="hours" label="登记时间(小时)" align="center"></el-table-column>
  
  <!-- 登记日期列内容居中显示 -->
  <el-table-column prop="date" label="登记日期" ></el-table-column>
  
  <!-- 工作项编号列内容居中显示 -->
  <el-table-column prop="item_number" label="工作项编号" align="center"></el-table-column>
  
  <!-- 事项列保持默认对齐（通常是左对齐） -->
  <el-table-column prop="item_name" label="事项"></el-table-column>
</el-table>

    </div>
  </template>
  
  <script>
import { ref, computed, onMounted, watch } from 'vue';
import { getWorkHourRequest } from '@/api/workspace.js';
import { ElMessage } from 'element-plus';
//import WorkHourForm from '@/components/RegisterWorkHour.vue';
import WorkHourForm from '@/components/workspace/RegisterHour.vue'; // 引入你的组件
export default {
    components: {
    WorkHourForm, // 注册你的组件
  },
  setup() {
    // 响应式状态
    const account_id = ref('12'); // 假设账户ID
    const searchText = ref('');
    const selectedFilter = ref('all');
    const items = ref([]);
    // 设置默认的日期范围为前七天到今天
    const dateRange = ref([new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()]);


    // 从API获取数据的方法
    const fetchItems = async () => {
      try {
        // 格式化日期为YYYY-MM-DD，调整回本地时区
       const formatDate = (date) => {
       const tzOffset = date.getTimezoneOffset() * 60000; // 时区偏移量（分钟）转换为毫秒
       const localDate = new Date(date - tzOffset);
       return localDate.toISOString().split('T')[0];
       };
        // 格式化日期为YYYY-MM-DD
        const [start, end] = dateRange.value.map(formatDate);
        const response = await getWorkHourRequest(account_id.value, start, end); // 使用日期范围调用API
        if (response.code === 200 && Array.isArray(response.data)) {
            items.value = response.data.map((item) => ({
            name: item.name,
            hours: item.hours,
            date: item.date,
            item_number: item.item_number,
            item_name: item.item_name,
            type:item.type
            // 根据实际返回的数据结构映射其他属性
            
          }));
          
          ElMessage({
              type: 'success',
              message: end,//'成功获取用户需求',
            });
        } else {
          ElMessage({
              type: 'error',
              message: '获取用户需求失败',
            });
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        ElMessage({
            type: 'error',
            message: 'An error occurred during workhour data retrieval',
          });
        console.error('Failed to fetch items:', error);
      }
    };

    // 计算属性，用于筛选和搜索数据
    const filteredItems = computed(() => {
      return items.value.filter((item) => {
        const matchesSearchText = item.item_name.includes(searchText.value);
        const matchesFilter = selectedFilter.value === 'all' || item.type === selectedFilter.value;
        return matchesSearchText && matchesFilter;
      });
    });

    // 观察日期范围的变化并在变化时调用fetchItems
    watch(dateRange, (newValue, oldValue) => {
      // 只有当新旧值不相等时才触发数据的重新获取
      if (newValue[0].getTime() !== oldValue[0].getTime() || newValue[1].getTime() !== oldValue[1].getTime()) {
        fetchItems();
      }
    });
    // 组件挂载时获取数据
    onMounted(fetchItems);

    // 返回响应式状态和方法
    return {
      searchText,
      dateRange,
      selectedFilter,
      items,
      filteredItems,
      fetchItems // 允许在模板中手动触发更新
    };
  }
};
</script>

  
  <style>
  .filter-input,
.date-picker,
.filter-select {
  display: flex;
  align-items: center; /* 这会垂直居中对齐flex项目 */
}
.date-row{
    margin-left:20px;
    width:400px;
}
  .filter-input{
    margin-bottom:0px;
    margin-left: 20px;
    margin-right: 20px;
    width:200px  !important;
  }
  .date-picker, .filter-select {
    margin-right: 10px;
  }
  .hourbody{
    margin-top:20px;
    width:1000px;
  }
  .hourtable{
    margin-left:20px;
    margin-top: 20px;
  }
  /* 样式可能需要根据实际情况调整 */
  </style>
  