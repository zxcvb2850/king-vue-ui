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
      <k-form-item label="爱好" prop="like">
        <k-checkbox-group v-model="form.like">
          <k-checkbox label="sing">唱</k-checkbox>
          <k-checkbox label="dump">跳</k-checkbox>
          <k-checkbox label="rap">rap</k-checkbox>
          <k-checkbox label="ball">篮球</k-checkbox>
        </k-checkbox-group>
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
import KCheckbox from '../components/checkbox/checkbox';
import KCheckboxGroup from '../components/checkbox/checkbox-group';

export default {
  name: 'home',
  components: {
    KForm, KFormItem, KInput, KCheckbox, KCheckboxGroup,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        like: [],
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
        like: [
          {
            required: true, type: 'array', message: '请选择爱好', trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      // this.checkboxRadio = false;
      /* this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          console.log('提交成功');
        } else {
          console.log('提交失败');
        }
      }); */

      this.$Alert.info({
        content: '我是提示信息 1',
        duration: 10,
      });
    },
  },
};
</script>
