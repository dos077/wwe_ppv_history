<template>
  <div class="chart-container">
    <canvas id="lineChart"
    ></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'LineChart',
  props: ['datasets'],
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    datasets() { this.updateChart(); },
  },
  methods: {
    drawChart() {
      const { datasets } = this;
      const ctx = document.getElementById('lineChart');
      const data = {
        datasets,
      };
      const options = {
        legend: {
          display: true,
          onClick: () => false,
          position: 'top',
        },
        scales: {
        },
      };
      this.chart = new Chart(ctx, { type: 'scatter', data, options });
    },
    updateChart() {
      while (this.chart.data.datasets.length > 0) {
        this.chart.data.datasets.pop();
      }
      this.chart.data.datasets.push(...this.datasets);
      this.chart.update();
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  height: 100%;
  max-width: 1280px;
  max-height: 640px;
  padding: 12px;
}
</style>
