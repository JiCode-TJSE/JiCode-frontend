  <template>
    <el-container class="container" id="allproduct">
        <el-header class="header">
          <h1 class="title" style="color: black;">全部产品</h1>
          <el-button class="addproduct" type="primary" @click="showDialog"><el-icon><Plus /></el-icon>&nbsp;&nbsp;新建产品</el-button>
        </el-header>
        <el-main class="main">
          <el-table
          :data="allproductsData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="product" label="产品" sortable>
            </el-table-column>
            <el-table-column prop="label" label="标识">
            </el-table-column>
            <el-table-column prop="belong" label="所属">
            </el-table-column>
            <el-table-column prop="date" label="更新日期" sortable>
            </el-table-column>     
          </el-table>
        </el-main>

        <el-dialog v-model="dialogTableVisible" title="新建产品" @close="handleClose">
          <el-form :model="form" label-width="80px">
            <el-form-item label="产品名称">
              <el-input v-model="form.productName"></el-input>
            </el-form-item>
            <el-form-item label="产品标识">
              <el-input v-model="form.productLabel"></el-input>
            </el-form-item>
            <el-form-item label="所属">
              <el-input v-model="form.productOrg"></el-input>
            </el-form-item>
            <el-form-item label="产品描述">
              <el-input v-model="form.productDesc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </el-container>
  </template>
  <script setup>
  import {Plus} from '@element-plus/icons-vue'
  import {ref, reactive} from 'vue';
  import {onMounted} from 'vue';
  import { getProduct, addProduct } from '@/api/product';
  import { ElMessage } from 'element-plus';

  const allproductsData = ref([]);

  const form = reactive({
    productName: '',
    productLabel: '',
    productOrg: '',
    productDesc: '',
  });

  onMounted(() => {
    getAllProduct()
  })

  const getAllProduct = () => {
    getProduct({
      productName: '',
      productLabel: '',
      productOrg: '',
      productDesc: ''
    })
      .then(resp => {
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

  const dialogTableVisible = ref(false);

  const showDialog = () => {
    dialogTableVisible.value = true;
  };


  const handleClose = () => {
    dialogTableVisible.value = false;
  };

  const submitForm = () => {
    allproductsData.value.push({
      product: form.productName,
      label: form.productLabel,
      belong: form.productOrg,
      date: new Date() 
    });
    addProduct(form.value)
      .then(resp => {
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