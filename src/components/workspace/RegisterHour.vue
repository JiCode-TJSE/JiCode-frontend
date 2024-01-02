<template>
    <div>
      <!-- Trigger button for the dialog -->
    <el-button type="primary" @click="dialogFormVisible = true">显示卡片</el-button>

  
      <!-- Dialog Form -->
    <el-dialog
      title="填写工时"
      v-model="dialogFormVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form label-position="top" class="form-layout">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="事项类型 *">
              <el-select v-model="formData.type" placeholder="工作项">
                <el-option label="工作项" value="工作项"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事项 *">
              <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="工作时长 *">
          <el-input v-model="formData.workhour" placeholder="请输入标题"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="剩余工时 *">
          <el-input v-model="formData.surplus" placeholder="请输入标题"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="工作日期 *">
              <el-date-picker v-model="formData.startDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="postWorkHour">确定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

  <script setup>
import { ref } from 'vue';

import { ElMessage } from 'element-plus';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElDatePicker, ElButton } from 'element-plus';
import { postWorkHourRequest} from '@/api/workspace.js'
//新建项目表单填写
const dialogFormVisible = ref(false);
// 表单的响应式状态
const formData = ref({
  type: '',
  title: '',
  workhour: '', // 工作时长
  surplus: '', // 剩余工时
  startDate: '', // 工作日期
});

// 显示卡片的状态
//const showCard = ref(false);

// 提交表单的函数
const postWorkHour = async () => {
  try {
    // 构造请求体
    const data = {
      name: formData.value.title, // 'name' 应与API期望的字段匹配
      type: formData.value.type,
      date: formData.value.startDate,
      hours: Number(formData.value.workhour), // 确保转换为需要的数据类型
      surplus_hour: Number(formData.value.surplus), // 确保转换为需要的数据类型
      account_id: 'your-account-id', // 这里使用实际的账户ID
    };

    // 发送POST请求到API
    const response = await postWorkHourRequest(data)

    // 根据响应处理结果
    if (response.code === 200) {
      ElMessage.success('工时登记成功！');
      // 成功后清空表单或执行其他操作
      formData.value = {
        type: '',
        title: '',
        workhour: '',
        surplus: '',
        startDate: '',
      };
    } else {
      ElMessage.error(`工时登记失败：${response.data.msg}`);
    }
  } catch (error) {
    ElMessage.error(`请求失败：${error.message}`);
  }
};
</script>

  
  <style scoped>
  .mb-4 {
  margin-top: 0px;
  margin-left: auto;
}
  .custom-card {
      transition: all 0.3s ease;
  }
  
 
  .custom-card{
    width:400px;
    height:500px;
    margin:auto;
  }
  .form-layout {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}
  </style>
  