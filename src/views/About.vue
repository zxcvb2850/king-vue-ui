<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!--<k-table
      :data="tableData"
      style="width: 100%">
      <k-table-column
        prop="date"
        label="日期"
        width="180">
      </k-table-column>
      <k-table-column
        prop="name"
        label="姓名"
        width="180">
      </k-table-column>
      <k-table-column
        prop="address"
        label="地址">
      </k-table-column>
    </k-table>-->
    <k-table :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="age">
        <k-input type="text" v-model="editAge" v-if="editIndex === index" />
        <span v-else>{{ row.age }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="address">
        <k-input type="text" v-model="editAddress" v-if="editIndex === index" />
        <span v-else>{{ row.address }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="birthday">
        <k-input type="text" v-model="editBirthday" v-if="editIndex === index" />
        <span v-else>{{formatDate(row)}}</span>
      </template>
    </k-table>
    <k-button @click="handleLookTable">查看</k-button>

    <k-tree :data="treeData" @on-toggle-expand="onToggleExpand" show-checkbox></k-tree>

    <component-a>
      <component-c>
        <component-b></component-b>
      </component-c>
    </component-a>
  </div>
</template>

<script>
import KTable from '../components/table/table';
import KInput from '../components/input/input';
import KButton from '../components/button/button';
import KTree from '../components/tree/tree';
import componentA from './componentA';
import componentB from './componentB';
import componentC from './componentC';

export default {
  name: '',
  components: {
    KTable,
    KButton,
    KInput,
    KTree,
    componentA,
    componentB,
    componentC,
  },
  data() {
    return {
      editName: '',
      editAge: '',
      editBirthday: '',
      editAddress: '',
      editIndex: -1,

      columns: [
        {
          title: '选择',
          type: 'selection',
          key: 'checked',
        },
        {
          title: '姓名',
          key: 'name',
          render: (h, { row, index }) => {
            let edit;
            // 当前行为聚焦行时
            if (this.editIndex === index) {
              edit = [h('input', {
                domProps: {
                  value: row.name,
                },
                on: {
                  input: (event) => {
                    this.editName = event.target.value;
                  },
                },
              })];
            } else {
              edit = row.name;
            }

            return h('div', [
              edit,
            ]);
          },
        },
        {
          title: '年龄',
          slot: 'age',
        },
        {
          title: '出生日期',
          slot: 'birthday',
        },
        {
          title: '地址',
          slot: 'address',
        },
        {
          title: '操作',
          render: (h, { row, index }) => {
            if (this.editIndex === index) {
              return [
                h(KButton, {
                  on: {
                    click: () => {
                      this.data[index].name = this.editName;
                      this.data[index].age = this.editAge;
                      this.data[index].birthday = this.editBirthday;
                      this.data[index].address = this.editAddress;
                      this.editIndex = -1;
                    },
                  },
                }, '保存'),
                h(KButton, {
                  style: {
                    marginLeft: '6px',
                  },
                  on: {
                    click: () => {
                      this.editIndex = -1;
                    },
                  },
                }, '取消'),
              ];
            }
            return h(KButton, {
              on: {
                click: () => {
                  this.editName = row.name;
                  this.editAge = row.age;
                  this.editAddress = row.address;
                  this.editBirthday = row.birthday;
                  this.editIndex = index;
                },
              },
            }, '修改');
          },
        },
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居',
          checked: true,
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道',
        },
      ],
      treeData: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                },
                {
                  title: 'leaf 1-1-2',
                },
              ],
            },
            {
              title: 'parent 1-2',
              children: [
                {
                  title: 'leaf 1-2-1',
                },
                {
                  title: 'leaf 1-2-1',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.data.push({
        name: '王小明',
        age: 18,
        birthday: '919526400000',
        address: '北京市朝阳区芍药居',
      });
    }, 3000);
  },
  methods: {
    handleLookTable() {
      console.log(this.data);
    },
    formatDate(row) {
      const date = new Date(Number(row.birthday));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}-${month}-${day}`;
    },
    onToggleExpand(data, cloneData) {
      console.log(data, cloneData);
    },
  },
};
</script>
