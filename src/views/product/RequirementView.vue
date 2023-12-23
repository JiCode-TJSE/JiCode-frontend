<template>
    <el-container class="container" id="allrequire">
        <el-header class="header">
          <h1 class="title" style="color: black;">全部需求</h1>
          <div class="buttons-container">
          <el-button type="danger" :icon="Delete" class="deleterequire" @click="deleteSelectedRequirements"/>
          <el-button class="addrequire" type="primary" @click="showDialog"><el-icon><Plus /></el-icon>&nbsp;&nbsp;新建需求</el-button>
          </div>
        </el-header>
        <el-main class="main">
          <el-table
          ref="multipleTableRef"
          :data="allrequireData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="number" label="编号" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" sortable>
            </el-table-column>

            <!-- 状态选择器 -->
            <el-table-column prop="state" label="状态" sortable>
                <template #default="scope">
                    <el-select v-model="scope.row.state" class="hidden-text" placeholder="Select" popper-class="no-border">
                        <template #prefix>
                            <el-tag :type="getStateColor(scope.row.state)">{{scope.row.state}}</el-tag>
                        </template>
                        <el-option v-for="item in state_options" :key="item.value" :value="item.value">
                            <el-tag :type="getStateColor(item.value)">{{ item.label }}</el-tag>
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column prop="principal" label="负责人" sortable>
            </el-table-column> 
            <el-table-column prop="date" label="创建时间" sortable>
            </el-table-column>     
          </el-table>
        </el-main>
        
        <!-- 新建需求 -->
        <el-dialog v-model="dialogTableVisible" title="新建需求" @close="handleClose">
          <el-row :gutter="20">
            <el-col :span="13">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input
                            v-model="form.desc"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            type="textarea"
                            placeholder="Please input"
                        />
                    </el-form-item>
                </el-form>
            </el-col>
            
            <!-- 分割线 -->
            <el-col :span="1">
                <el-divider direction="vertical" style="height: 90%;"></el-divider>
            </el-col>

            <el-col :span="10">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="所属产品">
                        <el-select v-model="form.state" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模块">
                        <el-select v-model="form.parts" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-select v-model="form.principal" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="需求类型">
                        <!-- <template #default="scope"> -->
                            <el-select v-model="form.type" class="hidden-text" placeholder="Select" popper-class="no-border">
                                <template #prefix>
                                    <el-tag :type="getTypeColor(form.type)">{{form.type}}</el-tag>
                                </template>
                                <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                                    <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                                </el-option>
                            </el-select>
                        <!-- </template> -->
                    </el-form-item>
                    <el-form-item label="需求来源">
                        <!-- <template #default="scope"> -->
                            <el-select v-model="form.source" class="hidden-text" placeholder="Select" popper-class="no-border">
                                <template #prefix>
                                    <el-tag :type="getTypeColor(form.source)">{{form.source}}</el-tag>
                                </template>
                                <el-option v-for="item in source_options" :key="item.value" :value="item.value">
                                    <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                                </el-option>
                            </el-select>
                        <!-- </template> -->
                    </el-form-item>        
                </el-form>
            </el-col>
          </el-row>
          <el-row class="button-container">
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-row>
        </el-dialog>
        <div class="page">
            <el-pagination background :current-page="currentPage" :page-size="pageSize" :total="total"
        @current-change="handlePageChange"></el-pagination>
        </div>
    </el-container>
  </template>

<script setup>
import {Plus, Delete} from '@element-plus/icons-vue'
import {ref,  reactive} from 'vue';
import {onMounted} from 'vue';
import { getRequireInPage, updateRequire
    // ,deleteRequire
     } from '@/api/require';
import { ElMessage } from 'element-plus';

// 获取需求列表
const allrequireData = ref([]);
// 用于储存被选中的行的数据
const multipleSelection = ref([]);  
// 选择改变时更新被选中的行
const handleSelectionChange = (val) => {
  multipleSelection.value = val;  
}

// 模拟需求列表数据
const mockData = ref([
  {
    number: '1',
    title: '需求1',
    state: '待评审',
    principal: '负责人A',
    date: '2023-01-01',
    product: '产品1',
    parts: '模块1',
    source: '内部需求',
    type: '安全需求',
    desc: '描述信息1',
  },
  {
    number: '2',
    title: '需求1',
    state: '待评审',
    principal: '负责人A',
    date: '2023-01-01',
    product: '产品1',
    parts: '模块1',
    source: '内部需求',
    type: '安全需求',
    desc: '描述信息1',
  },
  
]);

// 新建需求时的表单信息
const form = reactive({
    number: '', // 编号
    title: '', //标题（需求名字）
    state: '', //状态
    principal: '', //负责人
    date: '', // 创建时间
    product: '', //所属产品
    parts: '', //所属模块
    source: '', //需求来源
    type: '', //需求类型
    desc: '', //描述
});



const state_options = [
  {
    value: '待评审',
    label: '待评审',
  },
  {
    value: '已计划',
    label: '已计划',
  },
  {
    value: '进行中',
    label: '进行中',
  },
  {
    value: '已完成',
    label: '已完成',
  },
  {
    value: '已关闭',
    label: '已关闭',
  },
]

const getStateColor = (state) => {
  switch (state) {
    case '待评审':
      return 'warning';
    case '已计划':
      return 'info';
    case '进行中':
      return 'primary';
    case '已完成':
      return 'success';
    case '已关闭':
      return 'danger';
    default:
      return '';
  }
};

const type_options = [
  {
    value: '功能需求',
    label: '功能需求',
  },
  {
    value: '体验优化',
    label: '体验优化',
  },
  {
    value: '安全需求',
    label: '安全需求',
  },
  {
    value: '技术需求',
    label: '技术需求',
  },
]

const source_options = [
  {
    value: '产品规划',
    label: '产品规划',
  },
  {
    value: '用户反馈',
    label: '用户反馈',
  },
  {
    value: '竞品调研',
    label: '竞品调研',
  },
  {
    value: '内部需求',
    label: '内部需求',
  },
]

const getTypeColor = (type) => {
  switch (type) {
    case '功能需求' :
      return 'warning';
    case '体验优化':
      return 'info';
    case '安全需求':
      return 'primary';
    case '技术需求':
      return 'success';
    case '产品规划' :
      return 'warning';
    case '用户反馈':
      return 'info';
    case '竞品调研':
      return 'primary';
    case '内部需求':
      return 'success';
    default:
      return '';
  }
};



const getfromback = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))



/**
 * 分页部分逻辑
 */
const currentPage = ref(1);
const pageSize = 1;
const total = ref(1);

const getPageDataFromServer = () => {
  getRequireInPage({
    pageSize: pageSize,
    currentPage: currentPage.value,
    number: null,
    title: null,
    state: null,
    principal: null,
    date: null,
    product: null,
    parts: null,
    source: null,
    type: null,
    desc: null,
  })
    .then(resp => {
      allrequireData.value = [];
      console.log(resp);
      for(let i=0;i<resp.data.records.length;i++){
        allrequireData.value.push({
            title: resp.data.records[i].title,
            state: resp.data.records[i].state,
            principal: resp.data.records[i].principal,
            date: resp.data.records[i].date,
            product: resp.data.records[i].product,
            parts: resp.data.records[i].parts,
            source: resp.data.records[i].source,
            type: resp.data.records[i].type,
            desc: resp.data.records[i].desc,
        })
      }
      total.value = resp.data.total;
      ElMessage({
        message: '拉取需求成功',
        type: 'success',
      });
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('拉取需求失败');
    })
}

// 分页请求
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  getPageDataFromServer();
};

// 初始调用
onMounted(() => {
  // 测试数据
  allrequireData.value = mockData.value;
  total.value = mockData.value.length;

  getPageDataFromServer();
})

/**
 * TODO：删除选择的需求部分逻辑
 */


/**
 * 新建需求部分逻辑
 */
const dialogTableVisible = ref(false);
const showDialog = () => {
  dialogTableVisible.value = true;
};
const handleClose = () => {
  dialogTableVisible.value = false;
};

const submitForm = () => {
  const submitData = {
    title: form.title,
    state: form.state,
    principal: form.principal,
    date: form.date,
    product: form.product,
    parts: form.parts,
    source: form.source,
    type: form.type,
    desc: form.desc,
  };
  updateRequire(submitData)
    .then(resp => {
        // 直接在前端添加：之后删掉
        allrequireData.value.push(resp.data);
        console.log(resp);
        ElMessage({
          message: '添加需求成功',
          type: 'success',
        })
        // 从后端重新获取当前页的数据，确保新添加的项目能够出现在表格中
        getPageDataFromServer();
        handleClose();
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('添加需求失败');
    })
  
}

</script>
<style scoped>
#allrequire {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  height: 100vh; 
  margin: 0;
  padding: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  background-color: rgb(255, 255, 255);
}
.main{
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: center;
  width: 100%;
  background-color: rgb(255, 255, 255);
  flex: 1; 
}
.page{
    margin-bottom: 5%;
}
.buttons-container {
  margin-left: auto;
}
.hidden-text::v-deep .el-input__inner {
    color: transparent!important;
    border: none!important;
    box-shadow: none !important;
}
.hidden-text{
    width:50%;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>