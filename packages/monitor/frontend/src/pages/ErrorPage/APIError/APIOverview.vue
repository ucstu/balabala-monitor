<template>
  <div class="global">
    <div class="top">
      <div class="top-left">
        <div>时间范围:</div>
        <div><img src="@/assets/date.png" /></div>
        <div class="limit">30天</div>
      </div>
      <div class="top-right">
        <div class="calendar">
          <div class="start"><input readonly placeholder="startDate" /></div>
          <div>~</div>
          <div class="end"><input readonly placeholder="endDate" /></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="inform">
          <table>
            <thead>
              <tr>
                <th style="width: 70%">高频错误(最近60分钟)</th>
                <th style="width: 30%">发生次数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bottom-right">
        <div class="inform">
          <table>
            <thead>
              <tr>
                <th style="width: 70%">最新错误(最近5分钟)</th>
                <th style="width: 30%">发生次数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
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

<script setup lang="ts"></script>

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

  .inform {
    box-sizing: border-box;
    margin-bottom: 20px;

    table {
      width: 100%;
      text-align: left;
      border-collapse: collapse;

      thead tr {
        height: 80px;
      }

      th {
        padding-right: 10px;
        padding-left: 30px;
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

  .top {
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-template-columns: 1fr 360px;
    width: 100%;
    height: 300px;

    // border: 3px solid #ccc;
    background-color: rgb(255 255 255);

    .top-left {
      display: flex;
      flex-direction: row;
      column-gap: 10px;
      float: left;
      padding-top: 40px;
      padding-left: 40px;

      // border:3px solid #ccc;
      limit {
        float: left;
      }
    }

    .top-right {
      float: right;
      width: 100%;
      height: 30px;
      padding-top: 40px;

      .calendar {
        box-sizing: border-box;
        float: right;
        margin-right: 20px;
        border: 1px solid black;

        div {
          display: inline-block;
          margin-top: 5px;
          margin-right: 5px;
        }
      }

      input {
        width: 140px;
        text-align: center;
        border: 0;
      }
    }
  }

  .bottom {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 500px;
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
