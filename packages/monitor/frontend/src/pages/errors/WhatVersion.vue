<template>
  <div class="global">
    <div class="top">
      <div class="top-left">全部错误(错误数)</div>
      <div class="top-right">
        <div class="calendar">
          <input type="date" value="2022-08-13" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <table>
        <thead>
          <tr>
            <th class="th1">版本号</th>
            <th class="th2">错误数量</th>
            <th class="th3">最近发生时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.global {
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 4%);

  .top {
    width: 100%;
    height: 70px;
    background-color: rgb(255 255 255);

    .top-left {
      box-sizing: border-box;
      float: left;
      margin: 20px;
    }

    .top-right {
      box-sizing: border-box;
      float: right;
      margin-top: 20px;
      margin-right: 20px;

      .calendar {
        input {
          width: 130px;
          height: 28px;
          font-size: 14px;
          border: 0;
          border: 1px solid #d9d9d9;
          border-radius: 5px;
          outline: none;
          transition: all 30ms;

          &:focus {
            outline: 2px solid #1890ff;
          }
        }

        .calendar-left {
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
      }
    }
  }

  .bottom {
    width: 100%;
    background-color: rgb(255 255 255);

    table {
      width: 100%;
      text-align: left;
      border-collapse: collapse;

      .th1 {
        width: 60%;
      }

      .th2 {
        width: 20%;
      }

      .th3 {
        width: 20%;
      }

      th {
        padding: 20px;
        font-size: 16px;
        font-weight: 500;
        color: rgb(0 0 0 / 85%);
        background-color: rgb(207 199 199 / 8%);
      }

      thead tr {
        height: 80px;
        border-bottom: 1px solid #ccc;
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
}
</style>
