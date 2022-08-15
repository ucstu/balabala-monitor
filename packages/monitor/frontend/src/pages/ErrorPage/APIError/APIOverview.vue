<template>
  <div class="global">
    <div class="content">
      <div class="content-left">
        <div class="list">
          <table>
            <thead>
              <tr>
                <th style="width: 60%">高频错误(最近60分钟)</th>
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
}

.content {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  padding: 20px;

  .content-left {
    box-sizing: border-box;
    height: 100%;
    margin-right: 5px;

    // border: 2px solid #ccc;
    background-color: rgb(255 255 255);
  }

  .content-right {
    box-sizing: border-box;
    height: 100%;
    margin-left: 5px;

    // border: 2px solid #ccc;
    background-color: rgb(255 255 255);
  }
}

.list {
  box-sizing: border-box;
  height: 100%;
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
</style>
