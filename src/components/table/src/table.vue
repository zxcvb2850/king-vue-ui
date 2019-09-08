<template>
  <div :class="{'is-center' : center}" class="k-table">
    <div class="k-table-head">
      <table ref="tableHeader" class="table-fixed">
        <colgroup>
          <col v-for="(col, index) in columns" :key="index" :width="setCellWidth(col)" />
          <col v-if="scrollWidth" :width="scrollWidth" />
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="(head, index) in columns"
              :key="index"
              class="k-table-th"
            >
              {{ head.title }}
            </th>
            <th v-if="scrollWidth"></th>
          </tr>
        </thead>
      </table>
    </div>
    <div ref="tableBodyRef" class="k-table-body" :style="bodyStyle">
      <table v-if="data.length" ref="tableBody" class="table-fixed">
        <colgroup>
          <col v-for="(col, index) in columns" :key="index" :width="setCellWidth(col)" />
        </colgroup>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td
              v-for="(col, _index) in columns"
              :key="_index"
              :class="index%2 === 0? 'even' : 'odd'"
              class="k-table-td"
            >
              <template v-if="'render' in col">
                <Render :row="row" :column="col" :index="index" :render="col.render" />
              </template>
              <template v-else-if="'slot' in col">
                <slot :row="row" :column="col" :index="index" :name="col.slot"></slot>
              </template>
              <template v-else-if="'type' in col">
                <k-checkbox
                  :row="row"
                  :column="col"
                  :index="index"
                  :value="row[col.key]"
                  @change="handleChange(arguments, col.key, row)"
                />
              </template>
              <template v-else>
                {{ row[col.key] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import kTableHeader from './table-header';
import Render from "./render";
import KCheckbox from "../../checkbox/src/checkbox";

export default {
  name: "KTable",
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
    height: {
      type: [Number, String],
      default: 0,
    },
    size: String,
    center: Boolean,
  },
  data() {
    return {
      scrollWidth: 0, // 是否有滚动条,如果有则是滚动条的宽度
    };
  },
  computed: {
    bodyStyle() {
      const style = {};
      if (this.height !== 0) {
        const { height } = this;
        if (this.height) {
          style.height = height.indexOf("px") > -1 ? height : `${height}px`;
          style.overflowY = `auto`;
        }
      }
      return style;
    },
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.isScroll();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isScroll();
    });
  },
  methods: {
    handleChange(args, name, row) {
      /* eslint-disable */
      row[name] = args[0];
      return true;
    },
    // 设置单元格宽度
    setCellWidth(col) {
      let width = "";
      if (col.width) {
        width = col.width;
      }
      return width;
    },
    // 是否有滚动条
    isScroll() {
      const tableHeader = this.data.length ? this.$refs.tableHeader : 0;
      const tableBody = this.data.length ? this.$refs.tableBody : 0;
      const hWidth = tableHeader.scrollWidth ? tableHeader.scrollWidth : 0;
      const bWidth = tableBody.scrollWidth ? tableBody.scrollWidth : 0;
      this.scrollWidth = hWidth - bWidth;
    },
  },
};
</script>
