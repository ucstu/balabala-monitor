<template>
  <div class="tool">
    <h3>{{ title }}</h3>
    <DatePicker
      v-model:value="dateTime"
      :format="format"
      style="width: 150px"
      :disabled-date="disabledDateHandler"
      value-type="format"
      :editable="false"
      :clearable="false"
    />
  </div>
</template>

<script setup lang="ts">
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

const {
  title,
  format = "YYYY-MM-DD",
  dateTime: _dateTime,
} = defineProps<{
  title: string;
  format?: string;
  dateTime: Dayjs;
}>();

const emits = defineEmits<{
  (event: "update:dateTime", value: Dayjs): void;
}>();

const dateTime = $computed({
  get: () => _dateTime.format(format),
  set: (value) => emits("update:dateTime", dayjs(value, format)),
});

const disabledDateHandler = (date: Date) => dayjs(date).isAfter(dayjs());
</script>

<style scoped lang="scss">
.tool {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
