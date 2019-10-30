<template>
  <main-container>
    <v-col>
      <main-card
        titleColor="red" title="Headliners"
        @callDrawer="$emit('callDrawer')">
        <template v-slot:tool-actions>
          <v-btn @click="showFilter = !showFilter" text>
            filter<v-icon>{{ showFilter ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </template>
        <template v-slot:more-actions>
          <v-expand-transition>
            <v-slider
              v-show="showFilter"
              v-model="atLeast"
              :label="'Min Events'" :tick-labels="atLeastTicks"
              min="1" max="10"
              style="margin: 12px 24px;"
              color="red darken-2" track-color="red lighten-3"
            ></v-slider>
          </v-expand-transition>
        </template>
        <main-table
          :headers="headers" :items="items"
        ></main-table>
      </main-card>
    </v-col>
  </main-container>
</template>

<script>
import dataLogic from '../dataLogic';
import MainTable from './components/MainTable.vue';
import MainContainer from './components/MainContainer.vue';
import MainCard from './components/MainCard.vue';

export default {
  name: 'Headline',
  components: {
    'main-table': MainTable,
    'main-container': MainContainer,
    'main-card': MainCard,
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
      atLeast: 4,
      atLeastTicks: '1 2 3 4 5 6 7 8 9 10'.split(' '),
      showFilter: false,
      headliners: this.displayAll(),
    };
  },
  computed: {
    items() {
      const ws = this.headliners;
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
      return Math.round(sum * 100 / trimed.length) / 100;
    },
    displayAll() {
      const exps = dataLogic.headliners();
      const ids = Object.keys(exps).filter(id => !!id);
      return ids.map((id) => {
        const { name } = dataLogic.id2roster(id);
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
          name, count, totalBuys, avgBuys, avgGrow, avgAdj, id,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
