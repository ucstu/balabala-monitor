<template>
  <div class="global">
    <div class="top">
      <div class="top-left">
        <form action="#">
          <select>
            <option>全部错误</option>
            <option>错误</option>
            <option>自定义异常</option>
          </select>
        </form>
      </div>
      <div class="top-right">
        <div class="sort">
          <div style="color: #aaa">排序</div>
          <div>
            <form action="#">
              <select style="color: rgb(0 0 0 / 70%)">
                <option>发生次数</option>
                <option>影响人数</option>
              </select>
            </form>
          </div>
        </div>
        <div class="calendar">
          <input type="date" value="2022-08-13" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <table>
        <thead>
          <tr>
            <th class="checkbox th1">
              <div><input type="checkbox" /></div>
            </th>
            <th class="th2">
              <div>
                <button class="solve">
                  <!-- @click="" -->
                  <i><img src="@/assets/solve_before.png" /></i>
                  <span>解决</span></button
                ><button class="ignore">
                  <i><img src="@/assets/ignore_before.png" /></i>
                  <span>忽略</span>
                </button>
              </div>
            </th>
            <th class="th3">状态</th>
            <th class="th4">报错趋势:30min</th>
            <th class="th5">发生次数</th>
            <th class="th6">影响人数</th>
            <th class="th7">处理人</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox"><input type="checkbox" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="checkbox"><input type="checkbox" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="checkbox"><input type="checkbox" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="checkbox"><input type="checkbox" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="checkbox"><input type="checkbox" /></td>
            <td></td>
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

  select {
    cursor: pointer;
    border: 0;
  }

  .top {
    width: 100%;
    height: 70px;
    background-color: rgb(255 255 255);

    .top-left {
      box-sizing: border-box;
      float: left;
      margin: 20px;

      select {
        font-size: 18px;
      }
    }

    .top-right {
      box-sizing: border-box;
      float: right;

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

  .bottom {
    width: 100%;
    background-color: rgb(255 255 255);

    .checkbox {
      text-align: center;
    }

    table {
      width: 100%;
      margin: 0 auto;
      text-align: left;
      border-collapse: collapse;

      .th1 {
        width: 5%;
      }

      .th2 {
        width: 37%;
      }

      .th3 {
        width: 9%;
      }

      .th4 {
        width: 15%;
      }

      .th5 {
        width: 14%;
      }

      .th6 {
        width: 9%;
      }

      .th7 {
        width: 9%;
      }

      th {
        padding-right: 10px;
        font-size: 16px;
        font-weight: 500;
        color: rgb(0 0 0 / 85%);
        background-color: #fcfcfc;
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
