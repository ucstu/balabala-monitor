<template>
  <div class="global">
    <div class="content">
      <div class="content-left">
        <div class="content-top">
          <div class="error">JS错误</div>
          <div class="date">
            <div><img src="@/assets/24.png" /></div>
            <div>{{ date }}</div>
          </div>
        </div>
        <div class="list">
          <table>
            <thead>
              <tr>
                <th style="width: 60%">最新错误(最近5分钟)</th>
                <th style="width: 20%">发生次数</th>
                <th style="width: 20%">影响人数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>

                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>

                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>

                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="content-right">
        <div class="content-top">
          <div class="error">资源错误</div>
          <div class="date">
            <div><img src="@/assets/24.png" /></div>
            <div>{{ date }}</div>
          </div>
        </div>
        <div class="list">
          <table>
            <thead>
              <tr>
                <th style="width: 60%">最新错误(最近5分钟)</th>
                <th style="width: 20%">发生次数</th>
                <th style="width: 20%">影响人数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
let a = new Date().getTime();
let b = new Date(a);
function nowDate(now: Date) {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  return year + "-" + month + "-" + date;
}
let date = nowDate(b);
</script>

<style scoped lang="scss">
.global {
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 4%);

  img {
    float: right;
    width: 18px;
    height: 18px;
  }

  .content-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100px;

    .error {
      float: left;
      padding-left: 20px;
      margin-top: 30px;
    }

    .date {
      display: grid;
      grid-template-columns: 40px 1fr;
      justify-self: right;
      padding-right: 20px;
      margin-top: 30px;
      font-size: 12px;
    }
  }

  .list {
    box-sizing: border-box;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 20px;

    table {
      // margin: 0 auto;
      width: 100%;
      height: 100%;
      text-align: left;
      border-collapse: collapse;

      thead {
        height: 20%;
      }

      th {
        padding-right: 10px;
        padding-left: 10px;
        font-size: 16px;
        font-weight: 500;
        color: rgb(0 0 0 / 85%);
        background-color: #fcfcfc;
      }

      td {
        padding-right: 10px;
        padding-left: 10px;
      }

      tbody tr {
        height: 80px;
        border-bottom: 1px solid #ccc;

        &:hover {
          background-color: rgb(208 247 247);
        }
      }
    }
  }

  .content {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    padding: 10px;

    .content-left {
      box-sizing: border-box;
      display: grid;
      grid-template-rows: 100px 1fr;
      height: 100%;
      margin-right: 5px;

      // border: 2px solid #ccc;
      background-color: rgb(255 255 255);
    }
  }

  .content-right {
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 100px 1fr;
    height: 100%;
    margin-left: 5px;

    // border: 2px solid #ccc;
    background-color: rgb(255 255 255);
  }
}
</style>
