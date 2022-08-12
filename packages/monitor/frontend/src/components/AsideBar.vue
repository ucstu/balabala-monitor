<template>
  <aside class="leftMenu">
    <ul>
      <li v-for="(value, index) in menuList" :key="index">
        <router-link :to="value.path" active-class="active"
          ><i class="fa fa-desktop"></i>
          <span class="flex-row items-center justify-center">{{
            value.name
          }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
const { menuList } = defineProps<{
  menuList: Array<{
    name: String;
    path: String;
  }>;
}>();
</script>

<style scoped lang="scss">
.leftMenu {
  background-color: white;
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0;

  ul {
    margin-top: 5px;
    list-style: none;
    padding: 0;
    li {
      &:hover {
        background-color: rgba(201, 193, 193, 0.5);
      }
      a {
        height: 42px;
        line-height: 42px;
        padding-left: 15px;
        display: flex;
        align-items: center;
        text-decoration: none;
        border-right: 3px solid transparent;
        color: rgb(100, 98, 98);
        margin: 10px 0;
        &.active {
          color: #ea6947;
          border-right: 3px solid #ea5c35;
          background-color: rgba(255, 227, 235, 0.7);
        }
        span {
          flex: 1;
          overflow: hidden;
          text-overflow: clip; /*文字隐藏后添加省略号*/
          white-space: nowrap; /*强制不换行*/
        }
      }
    }
  }
}
</style>
