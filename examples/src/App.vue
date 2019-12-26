<template>
  <div class="wrap">
    <k-alert show-close title="title" description="test description" />
    <k-button type="primary" @click="showMessage">
      默认按钮
    </k-button>
    <k-button type="success" @click="showDialog">
      Dialog
    </k-button>
    <k-checkbox>单选框</k-checkbox>

    <k-input
      v-model="text"
      prefix-icon="smile-fill"
      suffix-icon="smile-fill"
      clear-icon
      type="text"
    >
      <template slot="prepend">http://</template>
      <template slot="append">.com</template>
    </k-input>

    <k-input
      v-model="text"
      prefix-icon="smile-fill"
      suffix-icon="smile-fill"
      type="text"
    />

    <k-icon name="smile-fill" />

    <k-table :data="tableData" :columns="columns" center height="100px" />

    <k-dialog :visible="visible" title="diaolog" @close="closeDialog">
      <div>dialog 内容</div>
    </k-dialog>

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
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      visible: false,
      columns: [
        { key: "id", title: "编号" },
        { key: "name", title: "姓名" },
      ],
      tableData: [
        { id: 1, name: "king" },
        { id: 2, name: "wang" },
        { id: 3, name: "zhang" },
      ],
      text: "",
      form: {
        name: "xxx",
        email: "xx@xx.com",
        like: ["dump", "sing"],
        sex: "nan",
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
      },
    };
  },
  methods: {
    showMessage() {
      console.log("---vue----", this);
      /* const h = this.$createElement;
      this.$alert({
        title: "我是标题",
        content:  h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ]),
        type: "warning",
      }); */
      /* this.$alert("我是标题", "我是内容", {
        userHtmlString: true,
        type: "warning",
        cancelButtonText: true,
        confirmButtonText: "好的",
        cancelButtonClass: "cancel",
        confirmButtonClass: "confirm",
        customClass: "box-box-box",
        center: true,
        showClose: true,
        closeOnClickModal: true,
        lockScroll: true,
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            console.log("执行中");
            setTimeout(() => {
              done();
            }, 1500);
          } else {
            done();
          }
        },
      }); */
      /* this.$prompt("提示", "请输入备注", {
        inputRegexp: /[^\s]/,
      })
        .then(({ value }) => {
          console.log("value: ", value);
        })
        .catch((cancel) => {
          console.log(cancel);
        }); */
      /* this.Message({
        content: "xxxxxxxxx",
        type: "error",
        duration: 0,
      }) */
    },
    showDialog() {
      this.visible = true;
    },
    closeDialog() {
      /* this.$alert("content", "title", {})
        .then((res) => {
          console.log("res:", res);
          this.visible = false;
        }).catch((error) => {
          console.log("error:", error);
        }); */


      this.$prompt("提示", "请输入备注", {
        inputRegexp: /[^\s]/,
      })
        .then(({ value }) => {
          console.log("value: ", value);
          this.visible = false;
        })
        .catch((cancel) => {
          console.log(cancel);
        });
    },
    submit() {
      console.log(this.form);
    },
  },
};
</script>

<style scoped lang="less">
</style>
