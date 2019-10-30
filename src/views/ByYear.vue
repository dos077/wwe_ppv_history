<template>
  <main-container>
      <v-col>
        <main-card
          titleColor="red" title="Headliners by Year"
          @callDrawer="$emit('callDrawer')">
          <template v-slot:tool-actions>
            <v-btn @click="showFilter = !showFilter" text>
              filter<v-icon>{{ showFilter ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </template>
          <template v-slot:more-actions>
            <v-card flat v-if="showFilter">
              <v-slider
                v-model="minEvents"
                :tick-labels="eventTicks" :label="'Min Events'"
                min="1" max="6"
                style="margin: 12px 24px;"
                color="red darken-2" track-color="red lighten-3"
              ></v-slider>
              <v-range-slider
                v-model="yearRange"
                :min="1985" :max="2013"
                style="margin: 12px 24px;"
                color="red darken-2" track-color="red lighten-3"
              >
                <template v-slot:prepend>
                  <v-chip dark color="red darken-2">From {{ yearRange[0] }}</v-chip>
                </template>
                <template v-slot:append>
                  <v-chip dark color="red darken-3">To {{ yearRange[1] }}</v-chip>
                </template>
              </v-range-slider>
            </v-card>
          </template>
          <by-year-table
            :headers="headers" :items="items"
          ></by-year-table>
        </main-card>
      </v-col>
    </main-container>
</template>

<script>
import dataLogic from '../dataLogic';
import MainContainer from './components/MainContainer.vue';
import ByYearTable from './components/ByYearTable.vue';
import MainCard from './components/MainCard.vue';

export default {
  name: 'StatPerYear',
  components: {
    'by-year-table': ByYearTable,
    'main-container': MainContainer,
    'main-card': MainCard,
  },
  data() {
    return {
      headers: [
        { text: 'Rank', value: 'rank' },
        { text: 'Name', value: 'wrestler.name' },
        { text: 'Year', value: 'year' },
        { text: 'Events', value: 'events.length' },
        { text: 'Average Buys', value: 'avgBuys' },
        { text: 'Growth%', value: 'avgGrow' },
        { text: 'Adjusted%', value: 'avgAdj' },
      ],
      rawStats: this.getStat(),
      showFilter: false,
      minEvents: 2,
      eventTicks: '1 2 3 4 5 6'.split(' '),
      minYear: 1985,
      maxYear: 2013,
      yearRange: [2004, 2013],
    };
  },
  computed: {
    items() {
      return this.rawStats
        .filter((yr) => {
          const countMatch = yr.events.length >= this.minEvents;
          const yrMatch = yr.year >= this.yearRange[0] && yr.year <= this.yearRange[1];
          return (countMatch && yrMatch);
        });
    },
  },
  methods: {
    getStat() {
      const wIds = Object.keys(dataLogic.headliners());
      const years = [];
      wIds.forEach((id) => {
        const wrestler = dataLogic.id2roster(id);
        if (!wrestler) return;
        const exps = dataLogic.statPerYear(id)
          .filter(ex => ex.type === 'headlining');
        exps.forEach(({
          events, year, avgBuys, avgGrow, avgAdj,
        }) => {
          years.push({
            id: `${id}-${year}`,
            wrestler,
            year,
            avgBuys,
            avgGrow,
            avgAdj,
            events,
          });
        });
      });
      return years;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
