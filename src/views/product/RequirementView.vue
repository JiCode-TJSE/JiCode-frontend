<template>
    <el-container class="container" id="allrequire">
        <el-header class="header">
          <h1 class="title" style="color: black;">全部需求</h1>
          <el-button class="addrequire" type="primary" @click="showDialog"><el-icon><Plus /></el-icon>&nbsp;&nbsp;新建需求</el-button>
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
import {Plus} from '@element-plus/icons-vue'
import {ref, reactive} from 'vue';
import {onMounted} from 'vue';
import { getRequireInPage, addRequire } from '@/api/require';
import { ElMessage } from 'element-plus';



const allrequireData = ref([]);

const multipleSelection = ref([]);  // 用于储存被选中的行的数据

const handleSelectionChange = (val) => {
  multipleSelection.value = val;  // 选择改变时更新被选中的行
}


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



// 分页
const currentPage = ref(1);
const pageSize = 1;

const total = ref(allrequireData.value.length);


// const getAllRequire = () => {
//   getRequireInPage({
//     pageSize: pageSize,
//     pageIndex: currentPage.value,
//     number: '', // 编号
//     title: '', //标题（需求名字）
//     state: '', //状态
//     principal: '', //负责人
//     date: '', // 创建时间
//     product: '', //所属产品
//     parts: '', //所属模块
//     source: '', //需求来源
//     type: '', //需求类型
//     desc: '', //描述
//   })
//     .then(resp => {
//       allrequireData.value=resp.data.records;
//       total.value=resp.data.total;
//       console.log(resp);

//       ElMessage({
//           message: '拉取产品成功',
//           type: 'success',
//         })
//         console.log(resp);
//     })
//     .catch(err => {
//       console.log(err);
//       ElMessage.error('拉取产品失败');
//     })
// }




//以下是点击新建需求之后的逻辑

const dialogTableVisible = ref(false);

const showDialog = () => {
  dialogTableVisible.value = true;
};


const handleClose = () => {
  dialogTableVisible.value = false;
};

// const submitForm = () => {
//   allrequireData.value.push({
//     number: form.number,
//     title: form.title,
//     state: form.state,
//     date: new Date(),
//     principal: form.principal,
//     product: form.product, //所属产品
//     parts: form.parts, //所属模块
//     source: form.source, //需求来源
//     type: form.type, //需求类型
//     desc: form.desc, //描述
//   });
//   addRequire(form.value)
//     .then(resp => {
//       ElMessage({
//           message: '添加产品成功',
//           type: 'success',
//         })
//         console.log(resp);
//     })
//     .catch(err => {
//       console.log(err);
//       ElMessage.error('添加产品失败');
//     })
//   handleClose();
// }

onMounted(() => {
  getPageDataFromServer();
})

const getPageDataFromServer = () => {
  getRequireInPage({
    pageSize: pageSize,
    currentPage: currentPage.value,
    number: form.number,
    title: form.title,
    state: form.state,
    principal: form.principal,
    date: form.date,
    product: form.product,
    parts: form.parts,
    source: form.source,
    type: form.type,
    desc: form.desc,
  })
    .then(resp => {
      allrequireData.value = resp.data.records;
      total.value = resp.data.total;
      console.log(resp);
      ElMessage({
        message: '拉取产品成功',
        type: 'success',
      });
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('拉取产品失败');
    })
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  getPageDataFromServer();
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
  addRequire(submitData)
    .then(resp => {
        console.log(resp);
      ElMessage({
          message: '添加产品成功',
          type: 'success',
        })
      // 这里重新获取当前页的数据，确保新添加的项目能够出现在表格中
      getPageDataFromServer();
      handleClose();
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('添加产品失败');
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