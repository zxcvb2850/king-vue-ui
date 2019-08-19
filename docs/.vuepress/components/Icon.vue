<template>
    <ul>
      <li
        v-for="icon in icons"
        :key="icon"
      >
        <i :class="'k-icon-'+ icon"></i>
        <span>k-icon-{{icon}}</span>
      </li>
    </ul>
</template>

<script>
  import icons from "../../icon";

  export default {
    name: "Icon",
    data() {
      return {
        icons: icons,
      };
    },
  };
</script>

<style scoped lang="stylus">
  ul {
    // display: flex;
    padding: 0;
    border: 1px solid #ccc;
    overflow: hidden;
  }
  li {
    list-style-type none;
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: -1px;
    margin-bottom: -1px;
    width: 16.66%;
    min-width: 120px;
    height: 100px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    &:last-child {
      border-right: 1px solid #ccc;
    }
    &:hover {
      color: #46bd87;
    }

    i {
      display: block
      font-size: 40px;
    }
    span {
      display: block
    }
  }
</style>
