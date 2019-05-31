<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <k-form ref="form" :model="form" :rules="rules">
      <k-form-item label="姓名" prop="name">
        <k-input v-model="form.name"/>
      </k-form-item>
      <k-form-item label="邮箱" prop="email">
        <k-input v-model="form.email"/>
      </k-form-item>
      <k-form-item>
        <button @click="handleSubmit">提交</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import KForm from '../components/form/form';
import KFormItem from '../components/form/form-item';
import KInput from '../components/input/input';

export default {
  name: 'home',
  components: { KForm, KFormItem, KInput },
  data() {
    return {
      form: {
        name: '',
        email: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('提交成功');
        } else {
          console.log('提交失败');
        }
      });
    },
  },
};
</script>
