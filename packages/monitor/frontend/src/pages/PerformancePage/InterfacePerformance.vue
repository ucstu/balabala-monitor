<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <div class="title">
          <i class="fa fa-hourglass-end"></i>
          <span> 耗时分段</span>
        </div>
        <div class="change">
          <label>
            <input
              v-model="activeSection"
              :value="0"
              type="radio"
              name="section"
            />
            <span><i class="fa fa-angle-left"></i>1秒</span></label
          >
          <label
            ><input
              v-model="activeSection"
              :value="1"
              type="radio"
              name="section"
            />
            <span>1-5秒</span></label
          >
          <label
            ><input
              v-model="activeSection"
              :value="2"
              type="radio"
              name="section"
            />
            <span>5-10秒</span></label
          >
          <label
            ><input
              v-model="activeSection"
              :value="3"
              type="radio"
              name="section"
            />
            <span>10-30秒</span></label
          >
          <label
            ><input
              v-model="activeSection"
              :value="4"
              type="radio"
              name="section"
            />
            <span><i class="fa fa-angle-right"></i>30秒</span></label
          >
        </div>
        <div class="data">
          <span
            ><strong>{{ sectionTotals[activeSection] || 0 }}</strong
            ><br />数量</span
          >
          <span
            ><strong
              >{{
                (
                  ((sectionTotals[activeSection] || 0) / (sectionTotal || 1)) *
                  100
                ).toFixed(2)
              }}%</strong
            ><br />百分比</span
          >
          <span
            ><strong>{{ yyyyMMdd }}</strong
            ><br />发生日期</span
          >
        </div>
      </div>
      <div class="right">
        <div class="title">
          <i class="fa fa-bar-chart"></i>
          <span> 变化趋势（近30天）</span>
        </div>
        <div class="bar"></div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <i class="fa fa-bars"></i>
        <span> 接口列表</span>
      </div>
      <div class="main">
        <div class="left">
          <ul>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="title">
            <i class="fa fa-flag"></i>
            <span> 常见指标</span>
          </div>
          <div class="board">
            <div class="data">
              <div class="time">
                <span>平均耗时</span>
                <span>6.82s</span>
              </div>
              <div class="icon">
                <i class="fa fa-hourglass-end"></i>
              </div>
            </div>
            <div class="data">
              <div class="time">
                <span>影响用户</span>
                <span>6.82s</span>
              </div>
              <div class="icon">
                <i class="fa fa-male"></i>
              </div>
            </div>
          </div>
          <div class="title">
            <i class="fa fa-bar-chart"></i>
            <span> 指标趋势</span>
          </div>
          <div class="bars">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPerformancesInterfaceindicatorstatistics } from "@/apis";
import { useStore } from "@/stores";
import { BasicStatistic } from "@/types";
import { BasicIndicator } from "@balabala/monitor-api";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";

const store = useStore();
const { appId } = $(storeToRefs(store));

let activeSection = $ref(0);
let activeDateTime = $ref(new Date());
const yyyyMMdd = $computed(() => dayjs(activeDateTime).format("YYYY-MM-DD"));
const MMdd = $computed(() => dayjs(activeDateTime).format("MM-DD"));
let interfaceIndicatorstatistics = $ref<Array<Array<BasicStatistic>>>([]);
const sectionTotals = $computed(() =>
  interfaceIndicatorstatistics.map(
    (section) => section.find(({ dateTime }) => dateTime === MMdd)?.count || 0
  )
);
const sectionTotal = $computed(() =>
  sectionTotals.reduce((total, count) => total + count, 0)
);
const getInterfaceIndicatorstatistics = async () => {
  const { data } = await getPerformancesInterfaceindicatorstatistics({
    appId,
    mainType: BasicIndicator.mainType.InterfaceIndicator,
    subType: BasicIndicator.subType.InterfaceIndicator,
    startTime: dayjs().subtract(30, "day").format("YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
  interfaceIndicatorstatistics = data;
};
getInterfaceIndicatorstatistics();
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .title {
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 3px solid #ea6947;
  }

  .top {
    display: flex;
    height: 200px;

    .left {
      display: flex;
      flex: 3;
      flex-direction: column;
      padding: 10px;

      .change {
        display: flex;
        margin-bottom: 10px;
        overflow: hidden;
        border-radius: 10px;

        label {
          flex: 1;
          line-height: 40px;
          border-right: 1px solid rgb(186 186 186);

          &:last-child {
            border-right: none;
          }

          span {
            display: inline-block;
            width: 100%;
            height: 100%;
            font-size: 15px;
            color: rgb(186 186 186);
            text-align: center;
            cursor: pointer;
            background-color: rgb(231 231 231);
          }

          input {
            display: none;

            &:checked ~ span {
              color: #fff;
              background-color: #ea6947;
            }
          }
        }
      }

      .data {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-around;

        // stylelint-disable-next-line all
        span {
          text-align: center;

          strong {
            font-size: 20px;
          }
        }
      }
    }

    .right {
      display: flex;
      flex: 7;
      flex-direction: column;
      padding: 10px;
      margin-left: 20px;

      .bar {
        flex: 1;
        width: 100%;
        background-color: #ea6947;
      }
    }
  }

  .content {
    padding: 10px;

    .main {
      display: flex;

      .left {
        flex: 3;
        margin-right: 40px;

        ul {
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;

          li {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 40px;
            margin-bottom: 10px;
            cursor: pointer;
            background-color: rgb(230 230 230);

            .fa {
              margin: 0 10px;
            }
          }
        }
      }

      .right {
        display: flex;
        flex: 7;
        flex-direction: column;

        .board {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;

          .data {
            display: flex;
            flex: 0 1 200px;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            padding: 20px;
            margin-right: 10px;
            background-color: #ea6947;
            border-radius: 10px;

            &:last-child {
              margin-right: 0;
            }

            .time {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              font-size: 20px;
            }

            .icon i {
              font-size: 30px;
            }
          }
        }

        .bars {
          display: flex;
          width: 100%;

          .bar1 {
            flex: 3;
            height: 200px;
            margin-right: 40px;
            background-color: #ea6947;
          }

          .bar2 {
            flex: 7;
            height: 200px;
            background-color: rgb(116 160 160);
          }
        }
      }
    }
  }
}
</style>
