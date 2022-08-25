<template>
  <aside class="left-menu">
    <ul>
      <li v-for="(menu, index) in menuList" :key="index">
        <router-link :to="menu.path" active-class="active"
          ><i class="fa" :class="menu.icon || 'fa-desktop'"></i>
          <span class="flex-row items-center justify-center">{{
            menu.name
          }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
const { menuList } = defineProps<{
  menuList: Array<{
    name: string;
    path: string;
    icon?: string;
  }>;
}>();
</script>

<style scoped lang="scss">
.left-menu {
  box-sizing: border-box;
  height: 100%;
  padding: 10px 0;
  background-color: white;

  ul {
    padding: 0;
    margin-top: 5px;
    list-style: none;

    li {
      &:hover {
        background-color: rgb(201 193 193 / 50%);
      }

      a {
        display: flex;
        align-items: center;
        height: 42px;
        padding-left: 20px;
        margin: 10px 0;
        line-height: 42px;
        color: rgb(100 98 98);
        text-decoration: none;
        border-right: 3px solid transparent;

        &.active {
          color: #ea6947;
          background-color: rgb(255 227 235 / 70%);
          border-right: 3px solid #ea5c35;
        }

        span {
          flex: 1;
          overflow: hidden;
          text-overflow: clip; /* 文字隐藏后添加省略号 */
          white-space: nowrap; /* 强制不换行 */
        }
      }
    }
  }
}
</style>
