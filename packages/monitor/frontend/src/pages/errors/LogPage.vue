<template>
  <div class="global">
    <div class="header">
      <div class="header-left">
        <div>
          <a href=""><img src="@/assets/Webfunny.png" /></a>
        </div>
        <div class="version">监控3.1.6</div>
        <div>
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
      </div>
      <div class="header-right">
        <div><a href="">首页</a></div>
        <div><a href="">概览</a></div>
        <div class="arrow">
          <div>用户</div>
          <div><img src="@/assets/arrow.png" /></div>
        </div>
        <div class="arrow">
          <div>错误</div>
          <div><img src="@/assets/arrow.png" /></div>
        </div>
        <div class="arrow">
          <div>性能</div>
          <div><img src="@/assets/arrow.png" /></div>
        </div>
        <div class="arrow">
          <div>实验室</div>
          <div><img src="@/assets/arrow.png" /></div>
        </div>
        <div class="arrow">
          <div>设置</div>
          <div><img src="@/assets/arrow.png" /></div>
        </div>
        <div>
          <a
            href=""
            target="_blank"
            title="监控系统使用文档,你也可以在每个链接后边点击Word图标跳转到对应的文档。"
            >使用文档</a
          >
        </div>
        <div><img src="@/assets/notice.png" /></div>
        <div><img src="@/assets/manage.png" /></div>
      </div>
    </div>
    <div class="content">
      <div class="content-top" :key="index" v-for="(item, index) in arr">
        <div>
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="content-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const arr: Array<string> = ["概览", "错误列表", "版本分析", "待处理错误"];
</script>

<style scoped lang="scss">
.global {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background-color: rgb(0 0 0 / 4%);
  display: grid;
  grid-template-rows: 50px 1fr;
  overflow: auto;
}
a {
  text-decoration: none;
  color: black;
}
.header {
  width: 100%;
  background-color: rgb(255, 255, 255);

  &-left {
    width: 40%;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    float: left;
    line-height: 50px;
    img {
      cursor: pointer;
    }
    .version {
      margin-top: 8px;
    }
  }

  &-right {
    float: right;
    width: 60%;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    cursor: pointer;
    line-height: 50px;
  }
  select {
    width: 140px;
    height: 30px;
    cursor: pointer;
  }

  .arrow {
    display: grid;
    grid-template-columns: 30px 1fr;
  }
}

.content {
  box-sizing: border-box;
  width: 100%;
  margin: 10px 10px;
  background-color: rgb(255, 255, 255);
  display: grid;
  grid-template-rows: 1fr 12fr;
  &-top {
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
  }
  &-top div {
    padding: 20px;
  }
  &-top div:active {
    border-bottom: 4px solid #ea6947;
    color: #ea6947;
  }
}
</style>
-->
