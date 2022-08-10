<template>
  <div class="main">
    <div class="main-title">用户细查</div>
    <div class="main-search">
      <input
        placeholder="请输入UserId,精确搜索用户行为记录"
        class="search-input"
        type="text"
        v-model="userId"
      />
      <button @click="clickSearch" class="search-btn">查询</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const userId = $ref<string>("");

const router = useRouter();
const clickSearch = () => {
  if (userId) {
    router.push({ path: "/customerSearch/details", query: { userId } });
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("../../assets/customerSerach.jpg");

  .main-title {
    font-size: 22px;
    margin-bottom: 10px;
    color: #fff;
    font-weight: bold;
    margin-top: 100px;
  }
  .main-search {
    display: flex;
    width: 700px;
    justify-content: center;
  }
  .search-input {
    width: 70%;
    height: 40px;
    outline: none;
    border-radius: 10px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 18px;
    font-weight: lighter;
    border-color: #fff;
    border: 0;
  }
  .search-btn {
    width: 100px;
    border-radius: 12px;
    outline: none;
    margin-left: 10px;
    border: 0;
    cursor: pointer;
    background-color: #ff7626;
    color: #fff;
    font-size: 16px;
  }
}
</style>
