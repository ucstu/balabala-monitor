<template>
  <div>
    <button class="login-btn" @click="clickLogin">登录</button>
    <teleport to="body">
      <div v-show="isShow" class="mask">
        <div class="login-page">
          <div class="login-header">
            <div style="font-weight: bold">{{ title }}</div>
            <img src="../assets/取消.png" alt="取消" @click="cancelLogin" />
          </div>
          <div v-show="!isRegister" style="position: relative">
            <input
              ref="name"
              v-model="userName"
              class="zhang-hao"
              type="text"
              placeholder="请输入用户名"
            />
            <div>用户名：</div>
          </div>
          <div style="position: relative">
            <input
              ref="input"
              v-model="phoneContent"
              class="zhang-hao"
              type="text"
              placeholder="请输入手机号"
            />
            <div>手机号：</div>
          </div>
          <div style="position: relative">
            <input
              v-model="password"
              class="zhang-hao"
              type="password"
              placeholder="请输入密码"
            />
            <div>密码：</div>
          </div>
          <button class="btn-login" @click="loginSure">登录</button>
          <div class="other-way">
            <span v-if="isRegister">其他登录方式</span>
            <span @click="userRegister"
              >没有账号、<span style="color: blue">注册</span></span
            >
          </div>
          <div>
            <div class="footer">
              注册登录即表示同意 <span> 用户协议<span>、 隐私政策</span></span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="isShowPrompt" class="right-prompt">
        <span>请填写{{ promptContent }}</span>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { postAccounts, postAccountsLogin } from "../apis/index";
let isShow = $ref(false);
let name = $ref<HTMLElement>(null as unknown as HTMLElement);
let phoneContent = $ref("");
let password = $ref<string>("");
let input = $ref<HTMLElement>(null as unknown as HTMLElement);
let isShowPrompt = $ref(false);
let promptContent = $ref("");
let title = $ref("手机登录");
let isRegister = $ref(true);
let userName = $ref<string>("");

function clickLogin() {
  isShow = true;
  setTimeout(() => {
    input.focus();
  }, 50);
}
function cancelLogin() {
  isShow = false;
  isRegister = true;
  phoneContent = "";
  password = "";
  userName = "";
}
function userRegister() {
  title = "请注册";
  isRegister = false;
  phoneContent = "";
  password = "";
  setTimeout(() => {
    name.focus();
  }, 50);
}
function loginSure() {
  if (!phoneContent) {
    isShowPrompt = true;
    promptContent = "手机号";
    setTimeout(() => {
      isShowPrompt = false;
    }, 2000);
  } else if (!password) {
    isShowPrompt = true;
    promptContent = "密码";
    setTimeout(() => {
      isShowPrompt = false;
    }, 2000);
  } else {
    if (title == "请注册") {
      postAccounts({
        requestBody: {
          phone: phoneContent,
          password,
          name: userName,
        },
      });
    } else if (title == "手机登录") {
      postAccountsLogin({
        requestBody: {
          phone: phoneContent,
          password,
        },
      });
    }
  }
}
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
  height: 300px;
  padding: 24px;
  font-size: 20px;
  background-color: white;
  border-radius: 3px;
  transform: translate(-50%, -50%);
}

.login-btn {
  width: 60px;
  height: 35px;
  color: #1e80ff;
  background-color: rgb(30 128 255 / 5%);
  border: 1px solid rgb(71 138 230);
  border-radius: 3px;
}

.login-page input {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  padding: 0 10px 0 63px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: lighter;
  text-align: left;
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
  display: flex;
  justify-content: space-between;
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

.right-prompt {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 134px;
  height: 43px;
  font-size: 14px;
  line-height: 43px;
  color: #1e80ff;
  text-align: center;
  background-color: #e1eeff;
}
</style>
