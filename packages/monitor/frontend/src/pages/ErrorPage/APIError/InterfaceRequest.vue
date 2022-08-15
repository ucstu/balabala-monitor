<template>
  <div class="global">
    <div class="top">
      <div class="top-left">
        <form action="#">
          <select>
            <option>全部错误</option>
            <option>400</option>
            <option>500</option>
          </select>
        </form>
      </div>
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
            <th class="th1">错误</th>
            <th class="th2">发生次数</th>
            <th class="th3">影响人数</th>
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

    .top-left {
      box-sizing: border-box;
      float: left;
      width: 140px;
      height: 40px;
      padding: 30px;
      font-size: 16px;
      font-weight: 800;
      cursor: pointer;

      select {
        width: 140px;
        height: 40px;
        font-size: 16px;
        font-weight: 800;
        cursor: pointer;

        // background-color: rgb(169 235 235);
      }
    }

    .top-right {
      float: right;
      padding: 30px;

      select {
        cursor: pointer;
        border: 0;
      }

      div {
        display: inline-block;
        margin-top: 10px;
        margin-right: 20px;
      }

      .sort {
        width: 160px;
        background-color: rgb(255 255 255);
        border: 1px solid #ccc;

        div {
          margin: 5px 10px;
        }
      }
    }

    .calendar {
      input {
        width: 130px;
        height: 32px;
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
    }
  }

  .bottom {
    padding: 30px;

    table {
      width: 100%;
      margin: 0 auto;
      text-align: left;
      border-collapse: collapse;
      background-color: rgb(255 255 255);

      .th1 {
        width: 60%;
        padding-left: 30px;
      }

      .th2 {
        width: 20%;
      }

      .th3 {
        width: 20%;
      }

      th {
        padding-right: 10px;
        font-size: 16px;
        font-weight: 500;
        color: rgb(0 0 0 / 85%);
        background-color: rgb(0 0 0 / 10%);
      }

      td {
        padding-right: 10px;
        padding-left: 10px;
      }

      thead tr {
        height: 80px;
        border-bottom: 1px solid #ccc;

        img {
          width: 14px;
          height: 14px;
        }

        span {
          width: 28px;
          margin-left: 8px;
        }
      }

      tbody tr {
        height: 80px;
        border-bottom: 1px solid #ccc;

        &:hover {
          background-color: rgb(208 247 247);
        }
      }

      // background-color: brown;
    }
  }
}
</style>
