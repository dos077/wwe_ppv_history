<template>
  <v-data-table
    :headers="headers" :items="items"
    sort-buy="count"
    calculate-widths
  >
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-start">{{ item.year }}</td>
        <td class="text-start">{{ item.type }}</td>
        <td class="text-start">{{ item.events.length }}</td>
        <td class="text-start">{{ item.avgBuys }}</td>
        <td class="text-start">
          <v-chip :color="chipColor(item.avgGrow)">
            {{ float2per(item.avgGrow) }}
          </v-chip>
        </td>
        <td class="text-start">
          <v-chip :color="chipColor(item.avgAdj)">
            {{ float2per(item.avgAdj) }}
          </v-chip>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'MainTable',
  props: ['headers', 'items'],
  methods: {
    float2per(float) {
      return Math.round(float * 10000) / 100;
    },
    chipColor(float) {
      if (float < -0.02) return '#f44336';
      if (float > 0.02) return '#4caf50';
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
