<template>
  <header class="main">
    <div class="left">
      <i class="fa fa-bars"></i>
      <span
        ><i class="fa fa-cloud-upload"></i> <strong>balabala云</strong></span
      >
    </div>
    <div class="right">
      <span><i class="fa fa-search"></i></span>
      <span><input type="text" /></span>
      <router-link to="/overView" class="i overview" active-class="active"
        >概览</router-link
      >
      <div class="i father">
        <a href="#">用户</a><i class="fa fa-chevron-down"></i>
        <ul>
          <li>
            <router-link to="/customerSearch">用户细查 (行为记录)</router-link>
          </li>
          <li>
            <router-link to="/customerSearch">连线用户 (远程调试)</router-link>
          </li>
        </ul>
      </div>
      <div class="i father">
        <a href="#">错误</a><i class="fa fa-chevron-down"></i>
        <ul>
          <li><router-link to="/customerSearch">错误统计</router-link></li>
          <li>
            <router-link to="/customerSearch">api接口错误统计</router-link>
          </li>
          <li>
            <router-link to="/customerSearch">静态资源错误统计</router-link>
          </li>
        </ul>
      </div>
      <div class="i father">
        <a href="#">性能</a><i class="fa fa-chevron-down"></i>
        <ul>
          <li><router-link to="/customerSearch">接口耗时</router-link></li>
          <li><router-link to="/customerSearch">页面性能</router-link></li>
        </ul>
      </div>
      <a href="#" class="i">支持</a>
      <a href="#" class="fa fa-envelope-o i"></a>
      <img src="@/assets/no_user.png" alt="#" />
    </div>
  </header>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { ref } from "vue";

let isUser = ref("none");
const props = defineProps<{
  route: RouteLocationNormalizedLoaded;
}>();
</script>

<style scoped lang="scss">
.main {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 3px 10px 0 rgb(0 0 0 / 4%);
  margin-bottom: 5px;
  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .fa-bars {
      font-size: 25px;
      padding: 12.5px 14px;
      color: white;
      background-color: #ea6947;
    }
    .fa-cloud-upload {
      font-size: 30px;
    }
  }
}

.left .fa-cloud-upload,
.left strong {
  color: #ea6947;
  padding: 0 10px;
}
.right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}
.right span input {
  border: none;
  background-color: rgb(244, 240, 240, 0.5);
}
.right span input:focus {
  outline: none;
}
.right span {
  background-color: rgb(244, 240, 240, 0.5);
  padding: 5px 5px;
  display: flex;
  align-items: center;
}
.right .i {
  padding: 10px 20px;
}
.right .overview.active {
  color: #ea6947;
  font-weight: 700;
}
.right a {
  text-decoration: none;
  color: grey;
}
.right a:hover {
  color: #ea6947;
  transition: top 0.3s ease;
}
.right img {
  margin: 0 30px 0 20px;
}
.right .father {
  position: relative;
  .fa {
    font-size: 10px;
    color: grey;
  }
}
.right .father:hover ul {
  display: block;
}
.right .father ul {
  position: absolute;
  top: 35px;
  left: 0px;
  list-style: none;
  display: flex;
  align-items: center;
  padding: 5px 5px;
  display: none;
  li a {
    display: inline-block;
    height: 42px;
    width: 150px;
    line-height: 42px;
    padding-left: 20px;
    text-decoration: none;
    color: rgb(100, 98, 98);
    font-size: 15px;
    background-color: white;
    border-radius: 5%;
  }
  li a:hover {
    background-color: rgba(201, 193, 193, 0.5);
  }
}
</style>
