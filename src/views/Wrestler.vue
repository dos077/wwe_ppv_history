<template>
  <main-container>
    <v-col>
      <main-card :title="title" titleColor="deep-purple"
        v-on:callDrawer="$emit('callDrawer')">
        <template v-slot:tool-actions>
          <v-chip-group mandatory
            v-model="graphSelected" :multiple="!w2id"
          >
            <v-chip
            active-class="red lighten-3 red--text text--accent-4">
              Headline</v-chip>
            <v-chip
              active-class="amber lighten-4 amber--text text--accent-4">
              Feature</v-chip>
          </v-chip-group>
        </template>
        <line-chart
          :datasets="chartData"
        ></line-chart>
      </main-card>
    </v-col>
    <template v-slot:secondary>
      <v-col cols="12" :sm="w2id ? 6 : 12">
        <main-card titleColor="red" :noNav="true">
          <template v-slot:tool-title>
            <v-autocomplete
              v-model="w1id"
              :items="roster" item-value="id" item-text="name"
              label="Wreslter"
              filled background-color="red lighten-4" color="red dark-4"
              style="margin-bottom: -24px;" dense
            ></v-autocomplete>
          </template>
          <template v-slot:tool-actions>
            <v-btn v-if="!w2id" text color="blue darken-3" dense
              @click="w2id='edge-273'">
              <v-icon>mdi-plus</v-icon>compare
            </v-btn>
          </template>
          <per-table
            :items="w1stat"
            :headers="w2id ? shortHeaders : headers"
          ></per-table>
        </main-card>
      </v-col>
      <v-col v-if="w2id" cols="12" :sm="6">
        <main-card titleColor="blue" :noNav="true">
          <template v-slot:tool-title>
            <v-autocomplete
              v-model="w2id"
              :items="roster" item-value="id" item-text="name"
              label="For Comparison"
              filled background-color="blue lighten-4" color="blue dark-4"
              style="margin-bottom: -24px;" dense
            ></v-autocomplete>
          </template>
          <template v-slot:tool-actions>
            <v-btn text color="red darken-3" @click="w2id = ''" dense>
              <v-icon>mdi-close</v-icon>Close
            </v-btn>
          </template>
          <per-table
            :items="w2stat" :headers="shortHeaders"
          ></per-table>
        </main-card>
      </v-col>
    </template>
  </main-container>
</template>

<script>
import data from '../data';
import dataLogic from '../dataLogic';
import data2graphs from '../graphLogic';
import PerTable from './components/PerTable.vue';
import LineChart from './components/LineChart.vue';
import MainContainer from './components/MainContainer.vue';
import MainCard from './components/MainCard.vue';

export default {
  name: 'Wrestler',
  components: {
    'per-table': PerTable,
    'line-chart': LineChart,
    'main-container': MainContainer,
    'main-card': MainCard,
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
      shortHeaders: [
        { text: 'Year', value: 'year' },
        { text: '#', value: 'count' },
        { text: 'Growth%', value: 'avgGrow' },
        { text: 'Adjusted%', value: 'avgAdj' },
      ],
      roster: data.roster,
      w1id: this.$route.params.id,
      w2id: '',
      graphSelected: [0, 1],
      chartData: [],
      typeNames: ['headlining', 'featuring'],
    };
  },
  watch: {
    w2id() {
      if (this.w2id && Array.isArray(this.graphSelected)) {
        const [value] = this.graphSelected;
        this.graphSelected = value;
      }
      this.populateChart();
    },
    w1id() {
      this.populateChart();
    },
    graphSelected() {
      this.populateChart();
    },
  },
  computed: {
    isDesktop() { return this.$vuetify.breakpoint.mdAndUp; },
    title() {
      const w1 = this.w1id ? dataLogic.id2roster(this.w1id) : null;
      if (!w1) return 'Not Found';
      const w2 = this.w2id ? dataLogic.id2roster(this.w2id) : null;
      return w1.name + (w2 ? ` vs ${w2.name}` : '');
    },
    tSelected() {
      const types = this.graphSelected;
      return Array.isArray(types) ? types : [types];
    },
    w1stat() {
      const id = this.w1id;
      if (!id) return [];
      const stats = this.statPerYear(id);
      const tNames = this.typeNames;
      const types = this.tSelected.map(i => tNames[i]);
      return stats.filter(e => types.includes(e.type));
    },
    w2stat() {
      const id = this.w2id;
      if (!id) return [];
      const stats = this.statPerYear(id);
      const tNames = this.typeNames;
      const types = this.tSelected.map(i => tNames[i]);
      return stats.filter(e => types.includes(e.type));
    },
  },
  methods: {
    populateChart() {
      const datasets = [];
      const w1stats = dataLogic.statPerYear(this.w1id);
      const w2stats = this.w2id ? dataLogic.statPerYear(this.w2id) : null;
      const types = this.typeNames;
      const w1colors = ['red', 'amber'];
      const w2colors = ['blue', 'cyan'];
      this.tSelected.forEach((i) => {
        const w1raw = w1stats.filter(ex => ex.type === types[i]);
        datasets.push(...data2graphs(w1raw, w1colors[i]));
        if (w2stats) {
          const w2raw = w2stats.filter(ex => ex.type === types[i]);
          datasets.push(...data2graphs(w2raw, w2colors[i]));
        }
      });
      this.chartData = datasets;
    },
    statPerYear(id) {
      return dataLogic.statPerYear(id);
    },
  },
  created() {
    this.populateChart();
  },
};
</script>

<style lang="scss" scoped>

</style>
