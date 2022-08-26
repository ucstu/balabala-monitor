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
const {} = defineProps<{
  titles: Array<string>;
  dataList: Array<Array<any>>;
  columnStyles?: Array<string>;
}>();

const emits = defineEmits<{
  (e: "rowClick", row: number, column: number): void;
}>();
</script>

<style scoped lang="scss">
table {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
  border-collapse: collapse;
  border-radius: 10px;
}

table td,
table th {
  height: 30px;
  color: #666;
  cursor: pointer;
  border: 1px solid #cad9ea;
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
