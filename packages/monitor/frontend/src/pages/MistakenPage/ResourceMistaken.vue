<template>
  <div class="global">
    <div class="content">
      <div class="chart">
        <DataCard
          icon="fa-bar-chart-o"
          title="资源加载报错(点击柱状图查看其它日期)"
        ></DataCard>
        <div ref="resourceDom" class="chart-content"></div>
      </div>
      <div class="statistics">
        <DataCard icon="fa-file-archive-o" title="今日概况"></DataCard>
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
import { getErrorsResourceerrorstatistics, ResourceError } from "@/apis";
import DataCard from "@/components/DataCard.vue";
import { useStore } from "@/stores";
import dayjs from "dayjs";
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
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().add(1, "day").format("YYYY-MM-DD"),
  granularity: "1d",
  mainType: ResourceError.mainType.ResourceError,
  subType: ResourceError.subType.ResourceError,
});

let overViewIndex = $ref<number>(0);
const loadResource = () => {
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

    .chart {
      padding: 20px;

      .chart-content {
        width: 95%;
        height: 580px;
        padding: 20px;
        padding-top: 0;
        cursor: pointer;
        background-color: #fff;
      }
    }

    .statistics {
      padding: 20px;

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
