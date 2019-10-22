<template>
  <canvas id="lineChart"
    width="1280px" height="720px"
  ></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'LineChart',
  props: ['labels', 'datasets'],
  data() {
    return {
      chart: {},
    };
  },
  mounted() {
    const { labels, datasets } = this;
    const ctx = document.getElementById('lineChart');
    const data = {
      labels,
      datasets,
    };
    const options = {
      scales: {
      },
    };
    this.chart = new Chart(ctx, { type: 'line', data, options });
  },
};
</script>

<style lang="scss" scoped>

</style>
