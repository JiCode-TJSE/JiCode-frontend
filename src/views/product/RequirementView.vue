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
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
          >
            <el-table-column type="selection" width="50"></el-table-column>

            <el-table-column prop="name" label="标题" sortable>
            </el-table-column>

            <!-- 类型选择器 -->
            <el-table-column prop="typeEnum" label="类型">
                <template #default="scope">
                    <el-select v-model="scope.row.typeEnum" class="hidden-text" placeholder="Select" popper-class="no-border">
                        <template #prefix>
                            <el-tag :type="getTypeColor(scope.row.state)">{{scope.row.typeEnum}}</el-tag>
                        </template>
                        <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                            <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column prop="supervisorName" label="负责人">
            </el-table-column> 

            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button type="danger" @click="deleteRequireForRow(row)" :icon="Delete" ></el-button>
                <!-- <el-button type="primary" @click="editRequireForRow(row)" :icon="Edit" ></el-button> -->
              </template>
            </el-table-column>

          </el-table>
        </el-main>


        
        <!-- 新建需求 -->
        <el-dialog v-model="dialogTableVisible" title="新建需求" @close="handleClose">
          <el-row :gutter="20">
            <el-col :span="13">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input
                            v-model="form.detail"
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
                        <el-select v-model="form.belongProductId" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="模块">
                        <el-select v-model="form.moduleEnum" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-select v-model="form.supervisorId" :options="getfromback">
                        </el-select>
                    </el-form-item>
                    <el-form-item label="需求类型">
                        <!-- <template #default="scope"> -->
                            <el-select v-model="form.typeEnum" class="hidden-text" placeholder="Select" popper-class="no-border">
                                <template #prefix>
                                    <el-tag :type="getTypeColor(form.typeEnum)">{{form.typeEnum}}</el-tag>
                                </template>
                                <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                                    <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                                </el-option>
                            </el-select>
                        <!-- </template> -->
                    </el-form-item>
                    <el-form-item label="需求来源">
                        <!-- <template #default="scope"> -->
                            <el-select v-model="form.sourceEnum" class="hidden-text" placeholder="Select" popper-class="no-border">
                                <template #prefix>
                                    <el-tag :type="getTypeColor(form.sourceEnum)">{{form.sourceEnum}}</el-tag>
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
// import {Edit} from '@element-plus/icons-vue';
import {Plus, Delete} from '@element-plus/icons-vue';
import {ref,  reactive} from 'vue';
import {onMounted} from 'vue';
import { getRequireInPage, addRequire ,deleteRequire
  // , updateRequire
    // , getRequireDetail
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

// 新建需求时的表单信息
const form = reactive({
  name: '', //标题（需求名字）
  supervisorId: '', //负责人
  moduleEnum: '', //所属模块
  sourceEnum: '', //需求来源
  typeEnum: '', //需求类型
  detail: '', //描述
  belongProductId:'',
});

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
const pageSize = 8;
const total = ref(1);

const getPageDataFromServer = () => {
  getRequireInPage({
    pageSize: pageSize,
    currentPage: currentPage.value,
    requirementId: null,
    name: null,
    supervisorName: null,
    typeEnum: null,
  })
    .then(resp => {
      console.log('getRequireInPage', resp);

      // 添加需求数据到 allrequireData 数组
      allrequireData.value = resp.data.records; // 假设响应中的需求数据在 records 字段中


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
  getPageDataFromServer();
})

/**
 * TODO：删除选择的需求部分逻辑
 */


/**
 * 删除某一行的需求
 */
  const deleteRequireForRow = (row) => {
  console.log('Row Object:', row);
  const id = row.requirementId; // 获取要删除的产品的 ID
  deleteRequire({id}) // 调用删除产品的 API 函数
    .then((resp) => {
      console.log('resp for deleteRequire',resp);
      console.log(resp.code);
      if(resp.code === 0){
        // 更新前端产品列表，移除已删除的产品
        allrequireData.value = allrequireData.value.filter(require => require.requirementId !== id);
        ElMessage.success('产品删除成功');
      } else {
        ElMessage.error('产品删除失败');
      }
    })
    .catch(error => {
      console.error('删除产品失败:', error);
      ElMessage.error('产品删除失败');
    });
};




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
    name: form.name,
    supervisorId: form.supervisorId,
    moduleEnum: form.moduleEnum,
    sourceEnum: form.sourceEnum,
    typeEnum: form.typeEnum,
    detail: form.detail,
    belongProductId:form.belongProductId,
  };
  addRequire(submitData)
    .then(resp => {    
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

/**
 * 需求详情部分逻辑：获取、修改
 */
const selectedRow = ref(null); 
const detailDialogVisible = ref(false); 

const handleRowClick = (row) => {
  selectedRow.value = row; 
  detailDialogVisible.value = true; 
};

// const detailform = {
//   name: "示例需求",
//   detail: "这是一个示例需求的描述。",
//   moduleEnum: "模块A",
//   sourceEnum: "用户反馈",
//   typeEnum: "功能需求",
//   supervisorName: "负责人A",
//   belongProductId: "产品ID",
//   clientArr: [
//     {
//       clientId: "clientID1",
//       name: "客户A",
//     },
//     {
//       clientId: "clientID2",
//       name: "客户B",
//     },
//   ],
//   supervisor: [
//     {
//       supervisorId: "string",
//       supervisorName: "string"
//     },
//   ],
//   backlogItemArr: [
//     {
//       backlogItemId: "backlogItemID1",
//       name: "工作项A",
//     },
//     {
//       backlogItemId: "backlogItemID2",
//       name: "工作项B",
//     },
//   ],
//   versionArr: [
//     {
//       id: "versionID1",
//       name: "版本A",
//       detail: "版本A详情",
//       createTime: "创建时间"
//     },
//     {
//       id: "versionID2",
//       name: "版本B",
//       detail: "版本B详情",
//       createTime: "创建时间"
//     },
//   ],
// };



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
    margin-bottom: 10%;
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