<template>
  <div class="global">
    <div class="top">
      <div class="top-left">
        <div>时间范围:</div>
        <div><img src="@/assets/date.png" /></div>
        <div class="limit">30天</div>
      </div>
      <div class="top-right">
        <input type="" />
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="collect">
          <div class="error">JS错误(onerror)</div>
          <div class="date">
            <div><img src="@/assets/24.png" /></div>
            <div>{{ date }}</div>
          </div>
        </div>
        <div class="inform">
          <table>
            <thead style="height: 45px">
              <tr>
                <th style="width: 58%">最新错误(最近5分钟)</th>
                <th style="width: 30%">发生次数</th>
                <th style="width: 12%">影响人数</th>
              </tr>
            </thead>
            <tbody>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bottom-right">
        <div class="collect">
          <div class="error">自定义异常(console.error)</div>
          <div class="date">
            <div><img src="@/assets/24.png" /></div>
            <div>{{ date }}</div>
          </div>
        </div>
        <div class="inform">
          <table>
            <thead style="height: 45px">
              <tr>
                <th style="width: 58%">最新错误(最近5分钟)</th>
                <th style="width: 30%">发生次数</th>
                <th style="width: 12%">影响人数</th>
              </tr>
            </thead>
            <tbody>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style="height: 80px">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr style="height: 80px">
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
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
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

  .collect {
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

  .inform {
    box-sizing: border-box;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 20px;

    table {
      margin: 0 auto;
      text-align: left;
      border-collapse: collapse;

      th {
        padding-right: 10px;
        background-color: rgb(0 0 0 / 3%);
      }

      tbody tr {
        border-bottom: 2px solid #ccc;

        &:hover {
          background-color: rgb(208 247 247);
        }
      }
    }
  }

  .top {
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 410px;

    // border: 3px solid #ccc;
    background-color: rgb(255 255 255);

    .top-left {
      display: flex;
      flex-direction: row;
      column-gap: 10px;
      float: left;
      padding-top: 20px;

      // display: grid;
      // grid-template-columns: 100px 50px 1fr;
      padding-left: 20px;

      // border:3px solid #ccc;
      limit {
        float: left;
      }
    }

    .top-right {
      box-sizing: border-box;
      float: right;

      // border: 3px solid #ccc;
      padding-top: 20px;
      padding-right: 20px;

      input {
        float: right;
      }
    }
  }

  .bottom {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 565px;
    margin-top: 10px;
    margin-bottom: 10px;

    .bottom-left {
      box-sizing: border-box;
      height: 100%;
      margin-right: 5px;

      // border: 2px solid #ccc;
      background-color: rgb(255 255 255);
    }
  }

  .bottom-right {
    box-sizing: border-box;
    height: 100%;
    margin-left: 5px;

    // border: 2px solid #ccc;
    background-color: rgb(255 255 255);
  }
}
</style>
