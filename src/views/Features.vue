<template>
    <v-card style="max-width: 1280px; margin: 0 auto;">
      <v-toolbar flat color="#e0e0e0">
        <v-toolbar-title>Feature Performers</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="showFilter = !showFilter" text>
          filter<v-icon>{{ showFilter ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-expand-transition>
        <v-slider
          v-show="showFilter"
          v-model="atLeast"
          :label="'Min Events'"
          :tick-labels="atLeastTicks"
          min="1" max="10"
          style="margin: 12px 24px;"
        ></v-slider>
      </v-expand-transition>
      <main-table
        :headers="headers" :items="items"
      ></main-table>
    </v-card>
</template>

<script>
import data from '../data';
import MainTable from './components/MainTable.vue';

export default {
  name: 'Headline',
  components: {
    'main-table': MainTable,
  },
  data() {
    return {
      headers: [
        { text: 'Rank', value: 'rank' },
        { text: 'Name', value: 'name' },
        { text: 'Events', value: 'count' },
        { text: 'Total Buys', value: 'totalBuys' },
        { text: 'Average Buys', value: 'avgBuys' },
        { text: 'Growth%', value: 'avgGrow' },
        { text: 'Adjusted%', value: 'avgAdj' },
      ],
      atLeast: 3,
      atLeastTicks: '1 2 3 4 5 6 7 8 9 10'.split(' '),
      showFilter: false,
      wrestlers: this.displayAll(),
    };
  },
  computed: {
    items() {
      const ws = this.wrestlers;
      const min = this.atLeast;
      return ws.filter(w => w.count >= min);
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
    displayAll() {
      const exps = data.features();
      const ids = Object.keys(exps).filter(id => !!id);
      return ids.map((id) => {
        const { name } = data.id2roster(id);
        const events = exps[id];
        const count = events.length;
        let totalBuys = 0;
        events.forEach((event) => {
          if (event.buys) totalBuys += event.buys;
        });
        const avgBuys = Math.round(this.getAvg(events.map(ev => ev.buys)));
        const avgGrow = this.getAvg(events.map(ev => ev.growth));
        const avgAdj = this.getAvg(events.map(ev => ev.adjGrowth));
        return {
          name, count, totalBuys, avgBuys, avgGrow, avgAdj,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
