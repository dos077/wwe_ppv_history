<template>
  <v-card style="max-width: 1280px; margin: 0 auto;">
    <v-toolbar color="#e0e0e0">
      <v-toolbar-title>{{ wrestler ? wrestler.name : 'Not Found' }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div style="max-width: 1200px; max-height: 720px">
      <v-responsive :aspect-ratio="16/9">
        <line-chart
          :labels="yearsActive" :datasets="chartData"
       ></line-chart>
      </v-responsive>
    </div>
    <per-table
      :items="statPerYear" :headers="headers"
    ></per-table>
  </v-card>
</template>

<script>
import data from '../data';
import PerTable from './components/PerTable.vue';
import LineChart from './components/LineChart.vue';

export default {
  name: 'Wrestler',
  components: {
    'per-table': PerTable,
    'line-chart': LineChart,
  },
  data() {
    return {
      headers: [
        { text: 'Year', value: 'year' },
        { text: 'Type', value: 'type' },
        { text: '#', value: 'count' },
        { text: 'Average Buys', value: 'avgBuys' },
        { text: 'Growth%', value: 'avgGrow' },
        { text: 'Adjusted%', value: 'avgAdj' },
      ],
    };
  },
  computed: {
    wrestler() {
      const { id } = this.$route.params;
      return data.id2roster(id);
    },
    exps() {
      const { id } = this.$route.params;
      return data.id2Exps(id);
    },
    statPerYear() {
      const raws = this.exps;
      return raws.map(({ year, type, events }) => {
        const avgBuys = Math.round(this.getAvg(events.map(ev => ev.buys)));
        const avgGrow = this.getAvg(events.map(ev => ev.growth));
        const avgAdj = this.getAvg(events.map(ev => ev.adjGrowth));
        return {
          year, type, events, avgBuys, avgGrow, avgAdj,
        };
      });
    },
    yearsActive() {
      const start = parseInt(this.wrestler.debut, 10);
      let final = start;
      this.statPerYear.map(({ year }) => parseInt(year, 10))
        .forEach((yr) => {
          if (yr > final) final = yr;
        });
      console.log(start, final);
      const years = [];
      for (let i = start; i <= final; i += 1) { years.push(i.toString()); }
      return years;
    },
    chartData() {
      const ftGrow = [];
      const ftAdj = [];
      const hlGrow = [];
      const hlAdj = [];
      this.yearsActive.forEach((yr, i) => {
        const hlStat = this.statPerYear.find(e => e.year === yr && e.type === 'headlining');
        const ftStat = this.statPerYear.find(e => e.year === yr && e.type === 'featuring');
        if (hlStat) {
          hlGrow[i] = hlStat.avgGrow;
          hlAdj[i] = hlStat.avgAdj;
        }
        if (ftStat) {
          ftGrow[i] = ftStat.avgGrow;
          ftAdj[i] = ftStat.avgAdj;
        }
      });
      const ftGrowData = {
        label: 'Avg Growth as Feature Performer',
        data: ftGrow,
        borderColor: '#d05ce3',
        backgroundColor: '#d05ce3',
        fill: false,
      };
      const ftAdjData = {
        label: 'Adjusted Growth as Feature Performer',
        data: ftAdj,
        borderColor: '#6a0080',
        backgroundColor: '#6a0080',
        fill: false,
      };
      const hlGrowData = {
        label: 'Avg Growth as Headliner',
        data: hlGrow,
        borderColor: '#ff7961',
        backgroundColor: '#ff7961',
        fill: false,
      };
      const hlAdjData = {
        label: 'Adjusted Growth as Headliner',
        data: hlAdj,
        borderColor: '#BA000D',
        backgroundColor: '#BA000D',
        fill: false,
      };
      return [hlGrowData, hlAdjData, ftGrowData, ftAdjData];
    },
  },
  methods: {
    getAvg(arr) {
      const trimed = arr.filter(el => !!el);
      if (!trimed && trimed.length === 0) return null;
      let sum = 0;
      trimed.forEach((n) => { sum += n; });
      return sum / trimed.length;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
