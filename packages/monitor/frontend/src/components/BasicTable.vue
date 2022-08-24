<template>
  <table class="pure-table">
    <thead>
      <tr>
        <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in dataList"
        :key="index"
        :class="{ 'pure-table-odd': index % 2 !== 0 }"
      >
        <td
          v-for="(data, _index) in item"
          :key="_index"
          :style="columnStyles?.[index] || ''"
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
</script>

<style scoped lang="scss">
table {
  border-spacing: 0;
  border-collapse: collapse;
}

td,
th {
  padding: 0;
}

.pure-table {
  overflow: hidden;
  empty-cells: show;
  border-spacing: 0;
  border-collapse: collapse;
  border-radius: 10px;
}

.pure-table caption {
  padding: 1em 0;
  font: italic 85%/1 arial, sans-serif;
  color: #000;
  text-align: center;
}

.pure-table td,
.pure-table th {
  padding: 0.5em 1em;
  margin: 0;
  overflow: visible;
  font-size: inherit;
  border-width: 0 0 0 1px;
  border-left: 1px solid #cbcbcb;
}

.pure-table thead {
  color: #000;
  text-align: left;
  vertical-align: bottom;
  background-color: #e0e0e0;
}

.pure-table td {
  background-color: transparent;
}

.pure-table-odd td {
  background-color: #f2f2f2;
}
</style>
