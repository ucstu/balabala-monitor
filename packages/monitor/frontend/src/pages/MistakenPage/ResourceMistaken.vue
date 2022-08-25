<template>
  <div class="global">
    <div class="content">
      <DataCard
        class="chart"
        icon="fa-bar-chart-o"
        title="资源加载报错(点击顶点查看其它日期)"
        :loading="resourceErrorStatisticsLoading"
      >
        <template #rActions>
          <DatePicker
            v-model:value="activeRawDateTime"
            format="YYYY-MM-DD"
            style="position: relative; width: 150px"
            value-type="format"
            :editable="false"
            :clearable="false"
          />
        </template>
        <ECharts
          :option="resourceErrorStatisticsChartOption"
          :autoresize="true"
          @click="handleChartClick"
        />
      </DataCard>
      <div class="statistics">
        <DataCard
          icon="fa-file-archive-o"
          :title="'当日概况（' + activeRawDateTime + '）'"
        >
          <div class="statistics-content">
            <div class="content-box box-one">
              <div class="picture">
                <img src="@/assets/re_total.png" alt="" />
              </div>
              <div class="count">
                <div>总发生次数</div>
                <div>
                  {{
                    resourceErrorStatistics?.[activeResourceErrorIndex]
                      ?.count || 0
                  }}
                  次
                </div>
              </div>
            </div>
            <div class="content-box box-two">
              <div>
                <div class="picture">
                  <img src="@/assets/pages.png" alt="" />
                </div>
                <div class="count">
                  <div>影响页面次数</div>
                  <div>
                    {{
                      resourceErrorStatistics?.[activeResourceErrorIndex]
                        ?.pageCount || 0
                    }}次
                  </div>
                </div>
              </div>
            </div>
            <div class="content-box box-three">
              <div>
                <div class="picture">
                  <img src="@/assets/users.png" alt="" />
                </div>
                <div class="count">
                  <div>影响人数</div>
                  <div>
                    {{
                      resourceErrorStatistics?.[activeResourceErrorIndex]
                        ?.userCount || 0
                    }}位
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DataCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataCard from "@/components/DataCard.vue";
import { basicChartOption } from "@/configs";
import { useResourceErrorStatistics } from "@/hooks";
import dayjs from "dayjs";
import type { EChartsCoreOption } from "echarts";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import ECharts from "vue-echarts";
import { ReactiveVariable } from "vue/macros";

let activeDateTime = $ref(dayjs());
let activeRawDateTime = $computed({
  get: () => activeDateTime.format("YYYY-MM-DD"),
  set: (value) => {
    activeDateTime = dayjs(value);
  },
});

let activeResourceErrorIndex = $ref(0);

const { resourceErrorStatistics, resourceErrorStatisticsLoading } = $(
  useResourceErrorStatistics(() => {
    return {
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      granularity: "1h",
    };
  })
);

const resourceErrorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        resourceErrorStatistics?.map((item) => item.dateTime.format("HH:mm")) ||
        [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: resourceErrorStatistics?.map((item) => item.count) || [],
        type: "line",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
      },
    ],
    ...basicChartOption,
  };
});

const handleChartClick = (e: { dataIndex: ReactiveVariable<number> }) => {
  activeResourceErrorIndex = e.dataIndex;
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
      margin-right: 10px;

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
