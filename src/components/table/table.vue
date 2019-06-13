<template>
  <table>
    <thead>
    <tr>
      <th v-for="(col,index) in columns" :key="index">{{ col.title }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, index) in data" :key="index">
      <td v-for="(col, _index) in columns" :key="_index">
        <template v-if="'render' in col">
          <Render :row="row" :column="col" :index="index" :render="col.render"></Render>
        </template>
        <template v-else-if="'slot' in col">
          <slot :row="row" :column="col" :index="index" :name="col.slot"></slot>
        </template>
        <template v-else-if="'type' in col">
          <k-checkbox :row="row" :column="col" :index="index" :value="row[col.key]" @change="handleChange(arguments, col.key, row)"></k-checkbox>
        </template>
        <template v-else>{{ row[col.key] }}</template>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
// import kTableHeader from './table-header';
import Render from './render';
import KCheckbox from '../checkbox/checkbox';

export default {
  name: 'kTable',
  components: { KCheckbox, Render },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    size: String,
  },
  data() {
    return {
    };
  },
  methods: {
    handleChange(args, name, row) {
      /* eslint-disable */
      row[name] = args[0];
      return true;
    },
  },
};
</script>

<style>
  table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th{
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  table td, table th{
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
</style>
