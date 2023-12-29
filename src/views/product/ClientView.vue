<template>
    <el-container class="container" id="client">
        <el-header class="header">
            <h1 class="title" style="color: black;">全部客户</h1>
            <div class="buttons-container">
            <el-button class="addrequire" type="primary" @click="showDialog"><el-icon><Plus /></el-icon>&nbsp;&nbsp;新建客户</el-button>
            </div>
        </el-header>
        <el-main class="main">
            <el-table
            ref="multipleTableRef"
            :data="clientData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
            >
                <el-table-column type="selection" width="50"></el-table-column>

                <el-table-column prop="name" label="客户名" sortable>
                </el-table-column>

                <!-- 等级选择器 -->
                <el-table-column prop="rank" label="等级">
                </el-table-column>

                <el-table-column prop="size" label="规模">
                </el-table-column> 

                <!-- 类型选择器 -->
                <el-table-column prop="type" label="类别">
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

                <el-table-column label="操作">
                    <template v-slot="{ row }">
                    <el-button type="danger" @click="deleteClientForRow(row)" :icon="Delete" ></el-button>
                    <!-- <el-button type="primary" @click="editRequireForRow(row)" :icon="Edit" ></el-button> -->
                    </template>
                </el-table-column>
            </el-table>

            <!-- 新建需求 -->
            <el-dialog v-model="dialogTableVisible" title="新建客户" @close="handleClose">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form :model="form" label-width="80px">
                        <el-form-item label="客户名称">
                        <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户介绍">
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
                        <el-form-item label="等级">
                            <el-input v-model="form.rank"></el-input>
                        </el-form-item>
                        <el-form-item label="规模">
                            <el-input v-model="form.size"></el-input>
                        </el-form-item>
                        <el-form-item label="类别">
                            <!-- <template #default="scope"> -->
                                <el-select v-model="form.type" class="hidden-text" placeholder="Select" popper-class="no-border">
                                    <template #prefix>
                                        <el-tag :type="getTypeColor(form.typeEnum)">{{form.type}}</el-tag>
                                    </template>
                                    <el-option v-for="item in type_options" :key="item.value" :value="item.value">
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

        </el-main>

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
import { getClientInPage, 
    addClient 
    ,deleteClient
//   // , updateClient
//     // , getClientDetail
     } from '@/api/client';
import { ElMessage } from 'element-plus';

// 获取需求列表
const clientData = ref([]);
// 用于储存被选中的行的数据
const multipleSelection = ref([]);  
// 选择改变时更新被选中的行
const handleSelectionChange = (val) => {
  multipleSelection.value = val;  
}



// 新建需求时的表单信息
const form = reactive({
  name: '', 
  type: '', 
  rank: '', 
  size: '', 
  detail: '', 
  id:'',
  product_id:'',
});

const type_options = [
  {
    value: '售后客户',
    label: '售后客户',
  },
  {
    value: '售前客户',
    label: '售前客户',
  },
]

const getTypeColor = (type) => {
  switch (type) {
    case '售后客户':
      return 'primary';
    case '售前客户':
      return 'success';
    default:
      return '';
  }
};

/**
 * 分页部分逻辑
 */
const currentPage = ref(1);
const pageSize = 8;
const total = ref(1);

const getPageDataFromServer = () => {
  const productIdFromUrl = window.location.pathname.split('/').pop();
  console.log('productIdFromUrl',productIdFromUrl);
  getClientInPage({
    pageSize: pageSize,
    currentPage: currentPage.value,
    name: '', 
    type: '', 
    rank: '', 
    size: '', 
    detail: '', 
    id:'',
    product_id: productIdFromUrl,
  })
    .then(resp => {
      console.log('getClientInPage', resp);

      clientData.value = resp.data.records; 
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
 * 新建客户部分逻辑
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
    type: form.type,
    rank: form.rank,
    size: form.size,
    id: form.id,
    detail: form.detail,
    product_id:form.product_id,
  };
  addClient(submitData)
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
 * 删除某一行的客户
 */
 const deleteClientForRow = (row) => {
  console.log('Row Object:', row);
  const id = row.id; // 获取要删除的客户的 ID
  deleteClient({id})
    .then((resp) => {
      console.log('resp for deleteClient',resp);
      console.log(resp.code);
      if(resp.code === true){
        // 更新前端客户列表，移除已删除的客户
        clientData.value = clientData.value.filter(client => client.id !== id);
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
</script>

<style scoped>
#client {
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