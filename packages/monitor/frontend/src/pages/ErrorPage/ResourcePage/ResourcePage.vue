<template>
  <div class="global">
    <div class="container">
      <div class="top">
        <div class="top-container">
          <div class="top-left">
            <div class="big-title">
              <div class="title title1">
                <div class="title-underline">
                  <img src="@/assets/resource.png" alt="" /><span
                    >资源加载报错(点击柱状图查看其它日期)</span
                  >
                </div>
              </div>
              <div class="top-chart"><div class="top-left-chart"></div></div>
            </div>
          </div>
          <div class="top-right">
            <div class="top-right-container big-title">
              <div class="title today">
                <div class="title-underline">
                  <img src="@/assets/re_overview.png" alt="" /><span
                    >今日概况</span
                  >
                </div>
              </div>
              <div class="top-right-content">
                <div class="right-area">
                  <div class="picture">
                    <div>
                      <img src="@/assets/re_total.png" alt="" />
                    </div>
                  </div>
                  <div><span>总发生次数</span></div>
                  <div><span>...次</span></div>
                </div>
                <div class="right-area">
                  <div class="picture">
                    <div><img src="@/assets/pages.png" alt="" /></div>
                  </div>
                  <div>影响页面次数</div>
                  <div>...次</div>
                </div>
                <div class="right-area">
                  <div class="picture">
                    <div><img src="@/assets/users.png" alt="" /></div>
                  </div>
                  <div>影响用户数</div>
                  <div>...位</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-container big-title">
          <div class="title title3">
            <div class="title-underline">
              <img src="@/assets/re_list.png" alt="" /><span
                >资源加载失败列表(TOP15)
              </span>
            </div>
          </div>
          <div class="bottom-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.global {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 1.5;

  img {
    width: 14px;
    height: 14px;
  }

  .container {
    padding: 0 20px;
  }

  .big-title {
    height: 44px;
    font-weight: 500;

    .title {
      padding: 12px 16px;
      border-bottom: 2px solid blue;
    }
  }

  .top {
    width: 100%;
    height: 400px;
    padding-bottom: 20px;

    .top-container {
      display: grid;
      grid-template-columns: 2fr 1fr;

      .title1 {
        width: 270px;
      }
    }

    .top-chart {
      width: 800px;
      height: 350px;
      margin: 40px 10px 10px 0;
    }

    .top-left-chart {
      width: 100%;
      height: 300px;
      overflow: hidden;

      // background-color: #fcf;
      border-radius: 10px;
    }

    .top-right {
      width: 100%;

      .today {
        width: 80px;
      }

      .top-right-content {
        width: 100%;
        margin-top: 40px;

        .right-area {
          margin-bottom: 20px;
        }

        img {
          width: 40px;
          height: 40px;
        }

        div {
          display: flex;
          flex-direction: column;
          float: left;
          width: 50%;
          text-align: center;

          span {
            font-size: 12px;
          }
        }

        .picture {
          div {
            margin: 0 auto;
          }
        }
      }
    }
  }

  .bottom {
    height: auto;

    .title3 {
      width: 180px;
    }
  }
}
</style>
