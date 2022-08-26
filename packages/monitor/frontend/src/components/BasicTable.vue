<template>
  <table>
    <thead>
      <tr>
        <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in dataList" :key="index">
        <td
          v-for="(data, _index) in item"
          :key="_index"
          :style="columnStyles?.[index] || ''"
          @click="emits('rowClick', index, _index)"
        >
          {{ data }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const { border = true } = defineProps<{
  border?: boolean;
  titles: Array<string>;
  dataList: Array<Array<any>>;
  columnStyles?: Array<string>;
}>();

const emits = defineEmits<{
  (e: "rowClick", row: number, column: number): void;
}>();

const border_width = $computed(() => (border ? "1px" : "0px"));
</script>

<style scoped lang="scss">
table {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
  word-break: break-all;
  border-collapse: collapse;
  border-radius: 10px;
}

table td,
table th {
  height: 30px;
  color: #666;
  cursor: pointer;
  border: 1px solid #cad9ea;
  border-width: v-bind(border_width);
}

table thead th {
  width: 100px;
  background-color: #cce8eb;
}

table tr:nth-child(odd) {
  background: #fff;
}

table tr:nth-child(even) {
  background: #f5fafa;
}
</style>
