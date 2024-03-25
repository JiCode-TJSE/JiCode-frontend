<template>
  <el-container class="container" id="allrequire">
    <el-header class="header">
      <h1 class="title" style="color: black;">全部需求</h1>
      <div class="buttons-container">
        <!-- <el-button type="danger" :icon="Delete" class="deleterequire" @click="deleteSelectedRequirements"/> -->
        <el-button class="addrequire" type="primary" @click="showTableDialog"><el-icon>
            <Plus />
          </el-icon>&nbsp;&nbsp;新建需求</el-button>
      </div>
    </el-header>
    <el-main class="main">
      <el-table ref="multipleTableRef" :data="allrequireData" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>

        <el-table-column prop="name" label="标题" sortable>
          <template #default="{ row }">
            <span @click="handleRowClick(row)">{{ row.name }}</span>
          </template>
        </el-table-column>

        <!-- 类型 -->
        <el-table-column prop="typeEnum" label="类型">
          <template #default="scope">
            <el-tag :type="getTypeColor(scope.row.typeEnum)">{{ scope.row.typeEnum }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="supervisorName" label="负责人">
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="danger" @click="deleteRequireForRow(row)" :icon="Delete"></el-button>
            <!-- <el-button type="primary" @click="editRequireForRow(row)" :icon="Edit" ></el-button> -->
          </template>
        </el-table-column>

      </el-table>
      <div class="page">
        <el-pagination background :current-page="currentPage" :page-size="pageSize" :total="total"
          @current-change="handlePageChange"></el-pagination>
      </div>
    </el-main>

    <!-- 需求详情 -->
    <el-dialog v-model="dialogVisible" title="需求详情" @close="handleClose">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form :model="selectedRow" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="selectedRow.name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="selectedRow.detail" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
                placeholder="Please input" />
            </el-form-item>
            <!-- <el-form-item label="模块">
                    <el-select v-model="selectedRow.moduleEnum" :options="getfromback">
                    </el-select>
                </el-form-item> -->

            <el-form-item label="模块">
              <el-row>
                <el-col :span="6">
                  <el-tag>{{ selectedRow.moduleEnum }}</el-tag>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="负责人">
              <!-- <el-select v-model="selectedRow.supervisorName" :options="getfromback">
                    </el-select> -->
              <el-input v-model="selectedRow.supervisorName" disabled></el-input>
            </el-form-item>
            <el-form-item label="需求类型">
              <el-select v-model="selectedRow.typeEnum" class="hidden-text" placeholder="Select" popper-class="no-border">
                <template #prefix>
                  <el-tag :type="getTypeColor(selectedRow.typeEnum)">{{ selectedRow.typeEnum }}</el-tag>
                </template>
                <el-option v-for="item in type_options" :key="item.value" :value="item.value">
                  <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="需求来源">
              <el-select v-model="selectedRow.sourceEnum" class="hidden-text" placeholder="Select"
                popper-class="no-border">
                <template #prefix>
                  <el-tag :type="getTypeColor(selectedRow.sourceEnum)">{{ selectedRow.sourceEnum }}</el-tag>
                </template>
                <el-option v-for="item in source_options" :key="item.value" :value="item.value">
                  <el-tag :type="getTypeColor(item.value)">{{ item.label }}</el-tag>
                </el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item label="客户">
                    <el-row>
                    <el-col :span="6" v-for="client in selectedRow.clientArr" :key="client.clientId">
                      <el-tag>{{ client.name }}</el-tag>
                    </el-col>
                  </el-row>
                </el-form-item> -->

            <!-- <el-form-item label="工作项">
                    <el-row>
                    <el-col :span="6" v-for="backlogItem in selectedRow.backlogItemArr" :key="backlogItem.backlogItemId">
                      <el-tag>{{ backlogItem.name }}</el-tag>
                    </el-col>
                  </el-row>
                </el-form-item> -->

            <el-form-item label="版本">
              <el-row>
                <el-tag>{{ selectedRow.foundVersion.name }}</el-tag>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="客户">
          <el-row>
            <el-col :span="6" v-for="(client, index) in selectedRow.clientArr" :key="client.clientId">
              <el-tag closable @close="handleTagClose(index)">{{ client.name }}</el-tag>
            </el-col>
          </el-row>
          <el-select style="margin-top: 20px;" v-model="selectedClient" placeholder="添加客户" @change="handleClientChange">
            <el-option v-for="item in client2sArr" :key="item.id" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane label="工作项">
          <el-row>
            <el-col :span="6" v-for="(workItem, index) in selectedRow.backlogItemArr" :key="workItem.backlogItemId">
              <el-tag closable @close="handleWorkItemTagClose(index)">{{ workItem.name }}</el-tag>
            </el-col>
          </el-row>
          <el-select style="margin-top: 20px;" v-model="selectedWorkItem" placeholder="添加工作项"
            @change="handleWorkItemChange">
            <el-option v-for="item in workItemsArr" :key="item.id" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane label="版本记录">
          <el-table :data="selectedRow.versionArr" style="width: 100%">
            <el-table-column prop="name" label="版本名称"></el-table-column>
            <el-table-column prop="detail" label="版本详情"></el-table-column>
            <el-table-column label="创建时间" width="100">
              <template v-slot:default="scope">
                {{ new Date(scope.row.createTime).toLocaleDateString() }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="156">
              <template v-slot:default="scope">
                <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
                <el-button v-if="selectedRow.foundVersion.id != scope.row.id" type="primary"
                  @click="handleClickTo(scope.row)">跳转</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 20px; float: right;" type="primary" @click="handleNewVersion">新建</el-button>
        </el-tab-pane>
      </el-tabs>
      <el-button style="margin-top: 20px" type="success" :icon="Check" @click="saveDetails">保存</el-button>
    </el-dialog>

    <!-- 新建版本 -->
    <el-dialog title="新建版本" v-model="dialogVersionVisible" width="30%" @close="resetForm">
      <el-form :model="versionForm" label-width="80px">
        <el-form-item label="版本名称">
          <el-input v-model="versionForm.name"></el-input>
        </el-form-item>
        <el-form-item label="版本详情">
          <el-input v-model="versionForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVersionVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitVersionForm()">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改版本 -->
    <el-dialog title="新建版本" v-model="putVersionVisible" width="30%" @close="resetForm">
      <el-form :model="versionForm" label-width="80px">
        <el-form-item label="版本名称">
          <el-input v-model="versionForm.name"></el-input>
        </el-form-item>
        <el-form-item label="版本详情">
          <el-input v-model="versionForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="putVersionVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditVersionForm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新建需求 -->
    <el-dialog v-model="dialogTableVisible" title="新建需求" @close="handleTableClose">
      <el-row :gutter="20">
        <el-col :span="13">
          <el-form :model="form" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="form.detail" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
                placeholder="Please input" />
            </el-form-item>
          </el-form>
        </el-col>

        <!-- 分割线 -->
        <el-col :span="1">
          <el-divider direction="vertical" style="height: 90%;"></el-divider>
        </el-col>

        <el-col :span="10">
          <el-form :model="form" label-width="80px">

            <!-- TODO!!! -->
            <!-- <el-form-item label="所属产品">
                        <el-select v-model="form.belongProductId">
                          <el-option
                            v-for="product in products"
                            :key="product.id"
                            :label="product.title"
                            :value="product.id"
                          ></el-option>
                        </el-select>
                    </el-form-item> -->
            <el-form-item label="模块">
              <el-input v-model="form.moduleEnum" placeholder="请输入模块名称"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
              <!-- <el-select v-model="form.supervisorName" :options="getfromback">
                        </el-select> -->
              <el-input placeholder="ZJK" disabled></el-input>
            </el-form-item>
            <el-form-item label="需求类型">
              <!-- <template #default="scope"> -->
              <el-select v-model="form.typeEnum" class="hidden-text" placeholder="Select" popper-class="no-border">
                <template #prefix>
                  <el-tag :type="getTypeColor(form.typeEnum)">{{ form.typeEnum }}</el-tag>
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
                  <el-tag :type="getTypeColor(form.sourceEnum)">{{ form.sourceEnum }}</el-tag>
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
  </el-container>
</template>

<script setup>
// import {Edit} from '@element-plus/icons-vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { Check } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue';
import { onMounted } from 'vue';
import { getProductRequireInPage, addProductRequire, deleteProductRequire, updateProductRequire, getProductRequireDetail, addVersion, switchVersion, editVersion } from '@/api/require';
import { getAllBacklogItems } from '@/api/backlogItem';
import { getClientInPage } from '@/api/client';
import { ElMessage } from 'element-plus';

const handleClickTo = (row) => {
  const submitData = {
    versionId: row.id,
    requirementId: requirementid.value,
  };
  switchVersion(submitData)
    .then(resp => {
      console.log(resp);
      ElMessage({
        message: '切换版本成功',
        type: 'success',
      })
      // 从后端重新获取当前页的数据，确保新添加的项目能够出现在表格中
      dialogVersionVisible.value = false;
      dialogVisible.value = false;
      getPageDataFromServer();
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('切换版本失败');
    })
};

/**
 * 获取产品id
 */
// 获取当前页面 URL
const currentUrl = window.location.href;
// 提取产品 ID
const productId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
console.log('productId', productId);

const handleTagClose = (index) => {
  selectedRow.value.clientArr.splice(index, 1);
};

const handleWorkItemTagClose = (index) => {
  selectedRow.value.backlogItemArr.splice(index, 1);
};

let selectedClient = ref(null);
let selectedWorkItem = ref(null);
let clientList = reactive([{ clientId: '', name: 'test' }]);

const handleClientChange = () => {
  console.log('selectedClient', selectedClient.value);
  const clientWithClientId = {
    ...selectedClient.value,
    clientId: selectedClient.value.id
  };
  selectedRow.value.clientArr.push(clientWithClientId);
  client2sArr = client2sArr.filter(client => client.id !== selectedClient.value.id);
  selectedClient.value = null;
};

const handleWorkItemChange = () => {
  console.log('selectedWorkItem', selectedWorkItem.value);
  const workItemWithBacklogItemId = {
    ...selectedWorkItem.value,
    backlogItemId: selectedWorkItem.value.id
  };
  selectedRow.value.backlogItemArr.push(workItemWithBacklogItemId);
  workItemsArr = workItemsArr.filter(workItem => workItem.id !== selectedWorkItem.value.id);
  selectedWorkItem.value = null;
};

let dialogVersionVisible = ref(false);
const handleNewVersion = () => {
  console.log("handleNewVersion")
  dialogVersionVisible.value = true;
};

let versionForm = reactive({
  name: '',
  detail: '',
});
const submitVersionForm = () => {
  const submitData = {
    name: versionForm.name,
    detail: versionForm.detail,
    requirementId: requirementid.value,
  };
  console.log(submitData)
  addVersion(submitData)
    .then(resp => {
      console.log(resp);
      ElMessage({
        message: '添加版本成功',
        type: 'success',
      })
      // 从后端重新获取当前页的数据，确保新添加的项目能够出现在表格中
      dialogVersionVisible.value = false;
      dialogVisible.value = false;
      getPageDataFromServer();
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('添加版本失败');
    })
}

let putVersionVisible = ref(false);
const handleEdit = (row) => {
  putVersionVisible.value = true;
  versionForm.name = row.name;
  versionForm.detail = row.detail;
  versionForm.id = row.id;
};
const submitEditVersionForm = () => {
  const submitData = {
    requirementId: requirementid.value,
    name: versionForm.name,
    detail: versionForm.detail,
    id: versionForm.id,
  };
  editVersion(submitData)
    .then(resp => {
      console.log(resp);
      ElMessage({
        message: '修改版本成功',
        type: 'success',
      })
      // 从后端重新获取当前页的数据，确保新添加的项目能够出现在表格中
      putVersionVisible.value = false;
      dialogVisible.value = false;
      getPageDataFromServer();
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('修改版本失败');
    })
}


/**
 * 获取所有产品
 */


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
  belongProductId: '',
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
    case '功能需求':
      return 'warning';
    case '体验优化':
      return 'info';
    case '安全需求':
      return 'primary';
    case '技术需求':
      return 'success';
    case '产品规划':
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
const pageSize = 10;
const total = ref(1);

const getPageDataFromServer = () => {
  getProductRequireInPage({
    pageSize: pageSize,
    pageNo: currentPage.value,
    productId: productId,
  })
    .then(resp => {
      console.log('getRequireInPage: ', resp);

      // 添加需求数据到 allrequireData 数组
      allrequireData.value = resp.data.records; // 假设响应中的需求数据在 records 字段中
      if (resp.data.records.total != 0) {
        for (let i = 0; i < resp.data.records.length; i++) {
          allrequireData.value[i] = {
            ...allrequireData.value[i],
            "supervisorName": "ZJK"
          };
        }
      }

      total.value = resp.data.total;
      ElMessage({
        message: '拉取需求成功',
        type: 'success',
      });
    })
    .catch(err => {
      console.log('getRequire err', err);
      ElMessage.error('拉取需求失败');
    })
}

const getClientList = () => {
  // 获取客户列表
  getClientInPage({
    pageSize: 10,
    pageNo: 1,
    productId: productId,
  })
    .then(resp => {
      console.log('getClientInPage', resp);
      clientList = resp.data.records;
    })
    .catch(err => {
      console.log('拉取客户失败', err);
    })

};

// 分页请求
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  getPageDataFromServer();
};

// 初始调用
onMounted(() => {
  getPageDataFromServer();
  getClientList();
  getWorkitems();
})

const getWorkitems = () => {
  // 设置工作项列表
  getAllBacklogItems({ organizationId: "1" })
    .then(resp => {
      console.log("!@#$%^^&", resp.data);
      workItemsArr = resp.data.map(item => ({
        id: item.id,
        name: item.topic,
      }))
      console.log("!@#$%^^&", workItemsArr);
    })
    .catch(err => {
      console.log('拉取工作项失败', err);
    })
}

/**
 * TODO：删除选择的需求部分逻辑
 */


/**
 * 删除某一行的需求
 */
const deleteRequireForRow = (row) => {
  console.log('Row Object:', row);
  const id = row.requirementId; // 获取要删除的产品的 ID
  deleteProductRequire({ requirementId: id }) // 调用删除产品的 API 函数
    .then((resp) => {
      console.log('resp for deleteRequire', resp);
      console.log(resp.code);
      // if(resp.code === 0){
      // 更新前端产品列表，移除已删除的产品
      allrequireData.value = allrequireData.value.filter(require => require.requirementId !== id);
      ElMessage.success('产品删除成功');
      getPageDataFromServer();
      // } else {
      //   ElMessage.error('产品删除失败');
      // }
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
const showTableDialog = () => {
  dialogTableVisible.value = true;
};
const handleTableClose = () => {
  dialogTableVisible.value = false;
};

const submitForm = () => {
  const submitData = {
    name: form.name,
    // supervisorId: form.supervisorId,
    supervisorId: 'f350ca1b-cf43-4d59-a1c0-2552fdec7ba8',
    moduleEnum: form.moduleEnum,
    sourceEnum: form.sourceEnum,
    typeEnum: form.typeEnum,
    detail: form.detail,
    // belongProductId:form.belongProductId,
    belongProductId: productId,
  };
  addProductRequire(submitData)
    .then(resp => {
      console.log(resp);
      ElMessage({
        message: '添加需求成功',
        type: 'success',
      })
      // 从后端重新获取当前页的数据，确保新添加的项目能够出现在表格中
      dialogVisible.value = false;
      getPageDataFromServer();
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('添加需求失败');
    })

}

/**
 * 需求详情部分逻辑：获取、修改
 */
const selectedRow = ref({
  name: '',
  detail: '',
  moduleEnum: '',
  sourceEnum: '',
  typeEnum: '',
  supervisorName: '',
  supervisorId: '',
  clientArr: [],
  backlogItemArr: [],
  versionArr: [],
});

const dialogVisible = ref(false);
const handleClose = () => {
  dialogVisible.value = false;
};

const requirementid = ref();
let client2sArr = reactive([]);
let workItemsArr = reactive([]);

const handleRowClick = (row) => {
  requirementid.value = row.requirementId;

  console.log('requirement row:', row)
  // 基本信息
  getProductRequireDetail({ requirementId: row.requirementId })
    .then((response) => {
      console.log('row.requirementId', row.requirementId)
      console.log('response require detail', response.data);
      // if (response.code === true) {
      ElMessage({
        message: '获取需求详情成功',
        type: 'success',
      })
      const data = response.data;
      selectedRow.value = response.data;

      // selectedRow.value.name = data.name;
      // selectedRow.value.detail = data.detail;
      // selectedRow.value.moduleEnum = data.moduleEnum;
      // selectedRow.value.sourceEnum = data.sourceEnum;
      // selectedRow.value.typeEnum = data.typeEnum;

      // 设置负责人的 ID 和姓名
      if (response.data.supervisor) {
        selectedRow.value.supervisorName = response.data.supervisor.supervisorId;
        selectedRow.value.supervisorId = response.data.supervisor.supervisorName;
      } else {
        selectedRow.value.supervisorName = '';
        selectedRow.value.supervisorId = '';
      }

      selectedRow.value.clientArr = response.data.clientArr;

      selectedRow.value.backlogItemArr = response.data.backlogItemArr;
      selectedRow.value.versionArr = response.data.versionArr;

      selectedRow.value.foundVersion = selectedRow.value.versionArr.find(version => version.id === selectedRow.value.versionId);
      console.log('selectedRow.value.foundVersion', selectedRow.value.foundVersion);


      // 设置可选客户列表
      client2sArr = clientList.filter(client => {
        return !selectedRow.value.clientArr.some(selectedClient => selectedClient.clientId === client.id);
      });

      // 设置可选工作项列表
      workItemsArr = workItemsArr.filter(workItem => {
        return !selectedRow.value.backlogItemArr.some(selectedWorkItem => selectedWorkItem.backlogItemId === workItem.id);
      });

      console.log('selectedRow.value.workItemsArr', workItemsArr);

      dialogVisible.value = true;

      // } else {
      //   ElMessage.error('获取需求详情失败');
      //   console.error(response.msg);
      // }
    })
    .catch((error) => {
      ElMessage.error('获取需求详情失败');
      console.error(error);
    });

};

// 保存需求信息
const saveDetails = () => {
  let clientIdArray = selectedRow.value.clientArr.map(client => client.clientId);
  let backlogItemIdArray = selectedRow.value.backlogItemArr.map(workItem => workItem.backlogItemId);
  // 构造请求参数
  const requestData = {
    requirementId: requirementid.value,
    name: selectedRow.value.name,
    detail: selectedRow.value.detail,
    moduleEnum: selectedRow.value.moduleEnum,
    sourceEnum: selectedRow.value.sourceEnum,
    typeEnum: selectedRow.value.typeEnum,
    supervisorId: 'f350ca1b-cf43-4d59-a1c0-2552fdec7ba8',
    clientArr: clientIdArray,
    backlogItemArr: backlogItemIdArray,
  };
  console.log('requestData', requestData)

  updateProductRequire(requestData)
    .then((response) => {
      console.log('保存成功', response.data);
      ElMessage({
        message: '保存需求详情成功',
        type: 'success',
      })
      dialogVisible.value = false;

    })
    .catch((error) => {
      console.error('保存失败', error);
      ElMessage.error('保存需求详情失败');
    });
};


</script>
<style scoped>
.save {
  margin-top: 20px;
}

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
  width: 100%;
  background-color: rgb(255, 255, 255);
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: rgb(255, 255, 255);
  flex: 1;
}

.page {
  margin-top: 20px;
}

.buttons-container {
  margin-left: auto;
}

.hidden-text::v-deep .el-input__inner {
  color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.hidden-text {
  width: 50%;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>