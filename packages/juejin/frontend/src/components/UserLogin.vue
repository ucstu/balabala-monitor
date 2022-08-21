<template>
  <div>
    <button @click="clickLogin">登录</button>
    <teleport to="body">
      <div v-if="isShow" class="mask">
        <div class="login-page">
          <div class="login-header">
            <div style="font-weight: bold">手机登录</div>
            <img src="../assets/取消.png" alt="取消" @click="cancelLogin" />
          </div>
          <div style="position: relative">
            <input
              ref="input"
              class="zhang-hao"
              type="text"
              placeholder="请输入手机号"
              :value="phoneContent"
            />
            <div>手机号：</div>
          </div>
          <div style="position: relative">
            <input
              class="zhang-hao"
              type="password"
              placeholder="请输入密码"
              :value="password"
            />
            <div>密码：</div>
          </div>
          <button class="btn-login" @click="loginSure">登录</button>
          <div class="other-way">
            <span>其他登录方式</span>
          </div>
          <div>
            <div class="footer">
              注册登录即表示同意 <span> 用户协议<span>、 隐私政策</span></span>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

let isShow = ref(false);
let input = ref(null);
let phoneContent = ref("");
let password = ref("");
function clickLogin() {
  isShow.value = true;
}
function cancelLogin() {
  isShow.value = false;
}
function loginSure() {
  console.log(phoneContent.value);
}
onMounted(() => {
  console.log(input.value);
});
</script>

<style scoped>
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0 0 0 / 30%);
}

.login-page {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 270px;
  height: 260px;
  padding: 24px;
  font-size: 20px;
  background-color: white;
  border-radius: 3px;
  transform: translate(-50%, -50%);
}

.login-page input {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  padding: 0 10px 0 63px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: lighter;
  text-align: center;
  border: 1px solid rgb(211 211 211);
  border-radius: 3px;
}

.login-page input:focus {
  border-radius: 2px;
  outline: 1px solid rgb(33 122 255);
}

.login-page .zhang-hao + div {
  position: absolute;
  top: 0;
  left: 10px;
  height: 38px;
  font-size: 15px;
  line-height: 38px;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.login-header img {
  width: 14px;
  height: 14px;
}

.btn-login {
  /* box-sizing: content-box; */
  width: 100%;
  height: 44px;
  padding: 6px 15px;
  margin-top: 5px;
  font-size: 15px;
  line-height: 28px;
  color: white;
  background-color: #1e80ff;
  border: 0;
  border-radius: 3px;
}

.other-way {
  height: 17px;
  margin-top: 12px;
  font-size: 14px;
  line-height: 17px;
  color: #1e80ff;
}

.footer {
  height: 17px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 17px;
  color: #767676;
}

.footer span {
  color: #1e80ff;
}
</style>
