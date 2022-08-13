<template>
  <div class="main">
    <div class="main-title">用户细查</div>
    <div class="main-search">
      <input
        v-model="userId"
        placeholder="请输入UserId,精确搜索用户行为记录"
        class="search-input"
        type="text"
      />
      <button class="search-btn" @click="clickSearch">查询</button>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-image: url("../../assets/customerSerach.jpg");

  .main-title {
    margin-top: 100px;
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }

  .main-search {
    display: flex;
    justify-content: center;
    width: 700px;
  }

  .search-input {
    width: 70%;
    height: 40px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: lighter;
    line-height: 40px;
    border: 0;
    border-color: #fff;
    border-radius: 10px;
    outline: none;
  }

  .search-btn {
    width: 100px;
    margin-left: 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    background-color: #ff7626;
    border: 0;
    border-radius: 12px;
    outline: none;
  }
}
</style>
