<template>
  <k-form ref="form" :model="form" :rules="rules" label-width="80px">
    <k-form-item label="姓名" prop="name">
      <k-input v-model="form.name" />
    </k-form-item>
    <k-form-item label="邮箱" prop="email">
      <k-input v-model="form.email" />
    </k-form-item>
    <k-form-item label="爱好" prop="like">
      <k-checkbox-group v-model="form.like">
        <k-checkbox label="sing">唱</k-checkbox>
        <k-checkbox label="dump">跳</k-checkbox>
        <k-checkbox label="rap">rap</k-checkbox>
        <k-checkbox label="ball">篮球</k-checkbox>
      </k-checkbox-group>
    </k-form-item>
    <k-form-item label="性别" prop="sex">
      <k-radio-group v-model="form.sex">
        <k-radio label="nan">男</k-radio>
        <k-radio label="nv">女</k-radio>
      </k-radio-group>
    </k-form-item>
    <k-form-item>
      <k-button @click="submit">提交</k-button>
    </k-form-item>
  </k-form>
</template>

<script>
  export default {
    name: "Form",
    data() {
      return {
        form: {
          name: "",
          email: "",
          like: [],
          sex: "",
        },
        rules: {
          name: [
            { required: true, message: "请输入用户名", trigger: "blur" },
          ],
          email: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { type: "email", message: "邮箱格式不正确", trigger: "blur" },
          ],
          like: [
            {
              required: true, type: "array", message: "请选择爱好", trigger: "change",
            },
          ],
          sex: [
            {
              required: true, message: "请选择性别", trigger: "change",
            }
          ]
        },
      }
    },
    methods: {
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log("submit");
          } else {
            console.log("error submit");
          }
        })
      }
    }
  };
</script>
