  <template>
    <el-container class="container" id="allproduct">

      <el-header class="header">
        <div>
          <el-icon color="#87CEFA" size="30">
            <SwitchFilled />
          </el-icon>
          <span>&nbsp;&nbsp;&nbsp;产品管理</span>
        </div>
        <!--用抽屉Drawer写帮助文档-->
        <!--还有Tooltip文字提示，可用性-->
        <el-button type="help" @click="helplog" :icon="QuestionFilled" circle />
      </el-header>


        <el-header class="header">
          <h1 class="title" style="color: black;">全部产品</h1>
          <el-button class="addproduct" type="primary" @click="showDialog"><el-icon><Plus /></el-icon>&nbsp;&nbsp;新建产品</el-button>
        </el-header>
        <el-main class="main">
          <el-table
          :data="allproductsData"
          style="width: 100%"

          >
            <el-table-column prop="title" label="产品" sortable>
              <template #default="{ row }">
                  <span @click="handleRowClick(row)">{{ row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="mark" label="标识">
              <template #default="{ row }">
                  <span @click="handleRowClick(row)">{{ row.mark }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="team_name" label="所属">
              <template #default="{ row }">
                  <span @click="handleRowClick(row)">{{ row.team_name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button type="danger" @click="deleteProductForRow(row)" :icon="Delete" ></el-button>
                <el-button type="primary" @click="editProductForRow(row)" :icon="Edit" ></el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-main>

        <!-- 新建产品对应的对话框 -->
        <el-dialog v-model="dialogTableVisible" title="新建产品" @close="handleClose">
          <el-form :model="form" label-width="80px">
            <el-form-item label="产品名称">
              <el-input v-model="form.title" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="产品标识">
              <el-input v-model="form.mark" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="所属">
              <el-input v-model="form.team_name" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="产品描述">
              <!-- <el-input v-model="form.detail"></el-input> -->
              <el-input
                    v-model="form.detail"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    type="textarea"
                    placeholder="Please input"
                />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <!-- 编辑产品对应的对话框 -->
        <el-dialog v-model="editDialogVisible" title="编辑产品" @close="handleEditClose">
          <el-form :model="editForm" label-width="80px">
            <el-form-item label="产品名称">
              <el-input v-model="editForm.name" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="产品标识">
              <el-input v-model="editForm.mark" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="所属">
              <el-input v-model="editForm.team_name" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="产品描述">
              <el-input
                v-model="editForm.detail"
                :autosize="{ minRows: 4, maxRows: 8 }"
                type="textarea"
                placeholder="Please input"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitEditForm">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </el-container>
  </template>
  <script setup>
  // import ProjectTopBar from "@/components/project/ProjectTopBar.vue"
  import {
      SwitchFilled,
      QuestionFilled,
  } from '@element-plus/icons-vue'
  import {Edit, Delete} from '@element-plus/icons-vue';
  import {Plus} from '@element-plus/icons-vue';
  import {ref, reactive} from 'vue';
  import {onMounted} from 'vue';
  import { addProduct } from '@/api/product';
  import { getProduct } from '@/api/product';
  import { deleteProduct } from '@/api/product';
  import { updateProduct } from '@/api/product';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  import store from '@/store';

  const router = useRouter(); 

  const allproductsData = ref([]);

  const form = reactive({
    title: '',
    mark: '',
    team_name: '',
    detail: '',
    id:'',
  });

  onMounted(() => {
    getAllProduct();
  })


  /**
   * 跳转到产品管理页面
   */
  
  const handleRowClick = (row) => {
    const productId = row.id; 
    router.push({ name: 'ProductManage', params: { id: productId }, path: `/product/${productId}` });
  };

  /**
   * 获取产品列表
   */
  const getAllProduct = () => {
    const accountId = store.state.user.account_id; // 从 Vuex 中获取 account_id
    console.log('accountId',accountId);
    getProduct({
      title: '',
      mark: '',
      team_name: '',
      detail: '',
      id:'',
      // account_id: accountId, // 将 account_id 作为查询参数传递
    })
      .then(resp => {
        console.log('resp', resp);
        allproductsData.value = resp.data.records;
        ElMessage({
            message: '拉取产品成功',
            type: 'success',
          })
          console.log(resp);
      })
      .catch(err => {
        console.log(err);
        ElMessage.error('拉取产品失败');
      })
  }

  /**
   * 删除某一行的产品
   */
  const deleteProductForRow = (row) => {
    console.log('Row Object:', row);
    const id = row.id; // 获取要删除的产品的 ID
    deleteProduct({id}) // 调用删除产品的 API 函数
      .then((resp) => {
        console.log('resp for deleteProduct',resp);
        console.log(resp.code);
        if(resp.code === true){
          // 更新前端产品列表，移除已删除的产品
          allproductsData.value = allproductsData.value.filter(product => product.id !== id);
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
   * 修改某一行的产品信息
   */
  // 添加新的响应式变量用于编辑产品的对话框
  const editDialogVisible = ref(false);
  const editForm = reactive({
    name: '',
    mark: '',
    team_name: '',
    detail: '',
    id: '',
  });

  // 编辑某一行的产品信息
  const editProductForRow = (row) => {
    // 填充编辑表单的字段
    editForm.id = row.id;
    editForm.name = row.title;
    editForm.mark = row.mark;
    editForm.team_name = row.team_name;
    editForm.detail = row.detail;

    editDialogVisible.value = true;
  };

  const handleEditClose = () => {
    editDialogVisible.value = false;
  };

  // 提交修改后的表单数据
  const submitEditForm = () => {
    // 调用更新产品的 API 函数
    updateProduct(editForm)
      .then(resp => {
        console.log('resp for updateProduct', resp);
        if (resp.code === true) {
          // 更新前端产品列表或重新拉取产品列表以刷新数据
          getAllProduct();
          ElMessage.success('产品更新成功');
        } else {
          ElMessage.error('产品更新失败');
        }
      })
      .catch(error => {
        console.error('更新产品失败:', error);
        ElMessage.error('产品更新失败');
      });

    // 关闭编辑对话框
    editDialogVisible.value = false;
  };

  /**
   * 新建产品
   */
  const dialogTableVisible = ref(false);

  const showDialog = () => {
    dialogTableVisible.value = true;
  };

  const handleClose = () => {
    dialogTableVisible.value = false;
  };

  const submitForm = () => {
    allproductsData.value.push({
      title: form.title,
      mark: form.mark,
      team_name: form.team_name,
      detail: form.detail,
    });
    addProduct(form.value)
      .then(resp => {
        console.log('resp');
        console.log(resp);
        ElMessage({
            message: '添加产品成功',
            type: 'success',
          })
          console.log(resp);
      })
      .catch(err => {
        console.log(err);
        ElMessage.error('添加产品失败');
      })
    handleClose();
  }



  </script>
  <style scoped>
  #allproduct {
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

  </style>