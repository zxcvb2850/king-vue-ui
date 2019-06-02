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

    <div>
      <k-checkbox v-model="checkboxRadio" @change="handleChange">单选框</k-checkbox>
    </div>
    <k-checkbox-group v-model="checkboxGroup">
      <k-checkbox label="apple">苹果</k-checkbox>
      <k-checkbox label="banner">香蕉</k-checkbox>
      <k-checkbox label="origin">橘子</k-checkbox>
    </k-checkbox-group>
  </div>
</template>

<script>
import KForm from '../components/form/form';
import KFormItem from '../components/form/form-item';
import KInput from '../components/input/input';
import KCheckbox from '../components/checkbox/checkbox';
import KCheckboxGroup from '../components/checkbox/checkbox-group';

export default {
  name: 'home',
  components: { KForm, KFormItem, KInput, KCheckbox, KCheckboxGroup },
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
      checkboxRadio: true,
      checkboxGroup: ['apple', 'banner', 'origin'],
    };
  },
  methods: {
    handleSubmit() {
      this.checkboxRadio = false;
      console.log(this.checkboxGroup)

      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('提交成功');
        } else {
          console.log('提交失败');
        }
      });
    },
    handleChange(val) {
      console.log('change', val);
    },
  },
};
</script>
