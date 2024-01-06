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

        <!-- 类型选择器 -->
        <el-table-column prop="typeEnum" label="类型">
          <template #default="scope">
            <el-select v-model="scope.row.typeEnum" class="hidden-text" placeholder="Select" popper-class="no-border">
              <template #prefix>
                <el-tag :type="getTypeColor(scope.row.typeEnum)">{{ scope.row.typeEnum }}</el-tag>
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
            <el-button type="danger" @click="deleteRequireForRow(row)" :icon="Delete"></el-button>
            <!-- <el-button type="primary" @click="editRequireForRow(row)" :icon="Edit" ></el-button> -->
          </template>
        </el-table-column>

      </el-table>
    </el-main>

    <!--  -->
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
                <el-col :span="6" v-for="version in selectedRow.versionArr" :key="version.id">
                  <el-tag>{{ version.name }}</el-tag>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="保存">
              <el-button type="primary" :icon="Check" @click="saveDetails" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="客户">
              
            </el-tab-pane>
            <el-tab-pane label="工作项">
              
            </el-tab-pane>
            <el-tab-pane label="版本记录">版本记录</el-tab-pane> -->
      </el-tabs>
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
    <div class="page">
      <el-pagination background :current-page="currentPage" :page-size="pageSize" :total="total"
        @current-change="handlePageChange"></el-pagination>
    </div>
  </el-container>
</template>

<script setup>
// import {Edit} from '@element-plus/icons-vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { Check } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue';
import { onMounted } from 'vue';
import { getProductRequireInPage, addProductRequire, deleteProductRequire, updateProductRequire, getProductRequireDetail } from '@/api/require';
import { ElMessage } from 'element-plus';

/**
 * 获取产品id
 */
// 获取当前页面 URL
const currentUrl = window.location.href;
// 提取产品 ID
const productId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
console.log('productId', productId);



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
    supervisorId: 'd4cc64a1-ade4-4532-a4dc-1ad54ae0df90',
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
      console.log('response.data.clientArr', response.data.clientArr);

      selectedRow.value.backlogItemArr = response.data.backlogItemArr;
      selectedRow.value.versionArr = response.data.versionArr;


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

// 基本信息
const saveDetails = () => {
  // 构造请求参数
  const requestData = {
    name: selectedRow.value.name,
    detail: selectedRow.value.detail,
    moduleEnum: selectedRow.value.moduleEnum,
    sourceEnum: selectedRow.value.sourceEnum,
    typeEnum: selectedRow.value.typeEnum,
    // supervisorId: selectedRow.value.supervisorId,
    supervisorId: '1',
    requirementId: requirementid.value,
    clientArr: null,
    backlogItemArr: null,
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
  margin-bottom: 10%;
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