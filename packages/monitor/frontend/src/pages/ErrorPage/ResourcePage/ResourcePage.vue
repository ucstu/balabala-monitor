<template>
  <div class="global">
    <div class="content">
      <div class="chart">
        <div class="chart-title">
          <div class="chart-underline">
            <img src="@/assets/resource.png" alt="" />
            <span>资源加载报错(点击柱状图查看其它日期)</span>
          </div>
        </div>
        <div ref="resourceDom" class="chart-content"></div>
      </div>
      <div class="statistics">
        <div class="statistics-title">
          <div class="statistics-underline">
            <img src="@/assets/re_overview.png" alt="" /> <span>今日概况</span>
          </div>
        </div>
        <div class="statistics-content">
          <div class="content-box box-one">
            <div class="picture">
              <img src="@/assets/re_total.png" alt="" />
            </div>
            <div class="count">
              <div>总发生次数</div>
              <div>
                {{
                  overView.length === 0 ? "" : overView[overViewIndex].count
                }}次
              </div>
            </div>
          </div>
          <div class="content-box box-two">
            <div>
              <div class="picture"><img src="@/assets/pages.png" alt="" /></div>
              <div class="count">
                <div>影响页面次数</div>
                <div>
                  {{
                    overView.length === 0
                      ? ""
                      : overView[overViewIndex].pageCount
                  }}次
                </div>
              </div>
            </div>
          </div>
          <div class="content-box box-three">
            <div>
              <div class="picture"><img src="@/assets/users.png" alt="" /></div>
              <div class="count">
                <div>影响人数</div>
                <div>
                  {{
                    overView.length === 0
                      ? ""
                      : overView[overViewIndex].userCount
                  }}位
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getErrorsResourceerrorstatistics } from "@/apis";
import { useStore } from "@/stores";
import { ResourceError } from "@balabala/monitor-api";
import * as echarts from "echarts";
import { storeToRefs } from "pinia";
import { nextTick } from "vue";
const resourceDom = $ref<HTMLElement>();

const store = useStore();
let { appId } = $(storeToRefs(store));
let option: any = $ref({
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [],
      type: "bar",
      itemStyle: {
        color: "#94d6da",
      },

      emphasis: {
        itemStyle: {
          color: "#009ad6",
        },
      },
    },
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
});
let mychart: any;
nextTick(() => {
  //ResourceParms.userid = route.query.userId + "";
  mychart = echarts.init(resourceDom);
  loadResource();
});
type count = {
  count: number;
  pageCount?: number;
  userCount: number;
};
let overView = $ref<count[]>([]);

const ResourceParms = $ref({
  appId,
  startTime: "2022-08-01 00:00:00",
  endTime: "2022-09-01 00:00:00",
  granularity: "1d",
  mainType: ResourceError.mainType.ResourceError,
  subType: ResourceError.subType.ResourceError,
});

let overViewIndex = $ref<number>(0);
const loadResource = () => {
  let timeStr: string[] = [];
  let value: number[] = [];
  console.log(ResourceParms);

  getErrorsResourceerrorstatistics({ ...ResourceParms }).then((res) => {
    res.data.forEach((data) => {
      overView.push(data);
      option.xAxis.data.push(data.dateTime);
      option.series[0].data.push(data.count);
    });
    mychart.setOption(option);
    mychart.on("click", (parm: any) => {
      overViewIndex = parm.dataIndex;
      console.log(parm);
    });
  });
};
</script>

<style lang="scss" scoped>
.global {
  width: 100%;
  height: 100%;

  .content {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 300px;
    height: 100%;
    padding: 20px;

    // background-color: cyan;
    span {
      font-size: 16px;
      font-weight: 700;
    }

    .chart {
      padding: 20px;

      // background-color: blue;

      .chart-title {
        height: 60px;

        .chart-underline {
          width: 320px;
          padding: 10px;
          border-bottom: 1px solid rgb(74 90 183);

          img {
            width: 14px;
            height: 14px;
            margin-right: 10px;
          }
        }
      }

      .chart-content {
        // box-sizing: border-box;
        width: 700px;
        height: 500px;
        padding: 20px;
        padding-top: 0;
        cursor: pointer;
      }
    }

    .statistics {
      padding: 20px;

      // background-color: cyan;

      .statistics-title {
        height: 80px;

        .statistics-underline {
          width: 100px;
          padding: 10px;
          border-bottom: 1px solid rgb(74 90 183);

          img {
            width: 13px;
            height: 15px;
            margin-right: 10px;
          }
        }
      }

      .statistics-content {
        .box-one {
          background-color: #e9e167;
        }

        .box-two {
          background-color: cyan;
        }

        .box-three {
          background-color: #ff7956;
        }

        .content-box {
          margin: 20px;
          margin-bottom: 40px;
          cursor: pointer;
          border: 1px solid #fff;
          border-radius: 10px;

          .picture {
            width: 220px;
            text-align: center;

            img {
              width: 40px;
              height: 40px;
            }
          }
        }

        .count {
          text-align: center;

          div {
            margin: 10px;
          }
        }
      }
    }
  }
}
</style>
