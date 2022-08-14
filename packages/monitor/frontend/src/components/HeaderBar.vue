<template>
  <header class="main">
    <div class="left">
      <i class="fa fa-bars" @click="hiddenAside = !hiddenAside"></i>
      <span
        ><img class="logo" src="/logo.png" alt="logo" /><strong
          >BalaBala云</strong
        ></span
      >
    </div>
    <div class="right">
      <span><i class="fa fa-search"></i></span>
      <span><input type="text" /></span>
      <router-link to="/Home/overView" class="i overview" active-class="active"
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
          <li>
            <router-link to="/ErrorPage/errors/OverviewPage"
              >错误统计</router-link
            >
          </li>
          <li>
            <router-link to="/ErrorPage/APIError/APIOverview"
              >api接口错误统计</router-link
            >
          </li>
          <li>
            <router-link to="/ErrorPage/ResourcePage/ResourcePage"
              >静态资源错误统计</router-link
            >
          </li>
        </ul>
      </div>
      <div class="i father">
        <a href="#">性能</a><i class="fa fa-chevron-down"></i>
        <ul>
          <li><router-link to="/PerformPage/PerAPI">接口耗时</router-link></li>
          <li><router-link to="/PerformPage/PerPage">页面性能</router-link></li>
        </ul>
      </div>
      <a href="#" class="i">支持</a>
      <a href="#" class="fa fa-envelope-o i"></a>
      <img src="@/assets/no_user.png" alt="#" />
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  hiddenAside: boolean;
}>();

const emit = defineEmits<{
  (event: "update:hiddenAside", value: boolean): void;
}>();

const hiddenAside = $computed({
  get: () => props.hiddenAside,
  set: (value) => emit("update:hiddenAside", value),
});
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background-color: white;
  box-shadow: 0 3px 10px 0 rgb(0 0 0 / 4%);

  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .fa-cloud-upload,
    strong {
      padding: 0 10px;
      color: #ea6947;
    }

    .logo {
      width: 40px;
      height: 40px;
      margin-left: 10px;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .fa-bars {
      padding: 12.5px 14px;
      font-size: 25px;
      color: white;
      background-color: #ea6947;
    }

    .fa-cloud-upload {
      font-size: 30px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;

    span {
      display: flex;
      align-items: center;
      padding: 5px;
      background-color: rgb(244 240 240 / 50%);

      input {
        background-color: rgb(244 240 240 / 50%);
        border: none;

        &:focus {
          outline: none;
        }
      }
    }

    .i {
      padding: 10px 20px;
    }

    .overview.active {
      font-weight: 700;
      color: #ea6947;
    }

    a {
      color: grey;
      text-decoration: none;

      &:hover {
        color: #ea6947;
        transition: top 0.3s ease;
      }
    }

    img {
      margin: 0 30px 0 20px;
    }

    .father {
      position: relative;

      ul {
        position: absolute;
        top: 20px;
        left: 0;
        display: flex;
        display: none;
        align-items: center;
        padding: 5px;
        list-style: none;

        li a {
          display: inline-block;
          width: 150px;
          height: 42px;
          padding-left: 20px;
          font-size: 15px;
          line-height: 42px;
          color: rgb(100 98 98);
          text-decoration: none;
          background-color: white;
          border-radius: 5%;
        }

        li a:hover {
          background-color: rgb(230 230 230);
        }
      }

      &:hover {
        ul {
          display: block;
        }
      }

      .fa {
        font-size: 10px;
        color: grey;
      }
    }
  }
}
</style>
