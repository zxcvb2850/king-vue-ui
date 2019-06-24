<template>
  <div class="home">
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
      <k-form-item label="性别" prop="sex">
        <k-radio-group v-model="form.sex">
          <k-radio label="nan">男</k-radio>
          <k-radio label="nv">女</k-radio>
        </k-radio-group>
      </k-form-item>
      <k-form-item>
        <k-button @click="handleSubmit">提交</k-button>
      </k-form-item>
    </k-form>
    <k-button-group>
      <k-button @click="showDialog = true">展示</k-button>
    </k-button-group>
    <k-dialog :visible.sync="showDialog" v-if="showDialog" title="提示">
      <span>弹窗内容</span>
      <span slot="footer">
        <k-button @click="showTestDialog = true">展示</k-button>
        <k-button @click="showDialog = false">取消</k-button>
        <k-button @click="handleClick">警告</k-button>
      </span>
    </k-dialog>

    <k-dialog :visible.sync="showTestDialog" title="两个弹窗" appendToBody>
      <span>弹窗内容</span>
      <span slot="footer">
        <span>xxxxxxxxx</span>
      </span>
    </k-dialog>

    <k-button @click="handleClick" icon="k-icon-info-circle">警告</k-button>
    <i class="k-icon-check-circle"></i>
    <k-icon name="appstore"></k-icon>
    <k-alert type="info" show-icon>
      <span>普通消息提示的文案</span>
    </k-alert>
    <k-alert show-icon type="success" title="成功消息提示的文案" />
    <k-alert show-icon type="warning" title="警告消息提示的文案" />
    <k-alert
      show-icon
      type="error"
      title="错误消息提示的文案"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      @close="handleAlertClose"
    />
  </div>
</template>

<script>
import KForm from '../components/form/form';
import KFormItem from '../components/form/form-item';
import KRadio from '../components/radio/radio';
import KRadioGroup from '../components/radio/radio-group';
import KButton from '../components/button/button';
import KButtonGroup from '../components/button/button-group';
import KCheckbox from '../components/checkbox/checkbox';
import KCheckboxGroup from '../components/checkbox/checkbox-group';
import KInput from '../components/input/input';
import KDialog from '../components/dialog/dialog';
import KIcon from '../components/icon/icon';
import KAlert from '../components/alert/alert';

export default {
  name: 'home',
  components: {
    // eslint-disable-next-line max-len
    KButtonGroup, KButton, KCheckbox, KCheckboxGroup, KRadio, KRadioGroup, KForm, KFormItem, KInput, KDialog, KIcon, KAlert,
  },
  data() {
    return {
      form: {
        name: 'xxx',
        email: 'xx@xx.com',
        like: [],
        sex: 'nan',
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
      showDialog: false,
      showTestDialog: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          console.log('提交成功');
        } else {
          console.log('提交失败');
        }
      });
    },
    handleClick() {
      const arr = ['info', 'success', 'warning', 'error'];
      const contentArr = [
        '我是提示信息我是提示信息',
        '我是提示信息我是',
        '我是提示信息我',
        '我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息',
        '我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息我是提示信息',
      ];
      const random = Math.floor(Math.random() * arr.length);
      // this.$notify.info({ content: '<p>我是提示信息 1</p>', duration: 5000 });
      // console.log(this);
      this.$message({
        type: arr[random],
        content: contentArr[random],
        duration: 0,
        showClose: true,
      });
    },
    handleAlertClose() {
      console.log('close');
    },
  },
};
</script>
