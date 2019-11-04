<template>
  <v-data-table
    :headers="modHeaders" :items="items"
    sort-by="year"
    calculate-widths :mobile-breakpoint="1"
    single-expand :show-expand="false"
  >
    <template v-slot:item="{ item, isExpanded, expand, headers }">
      <tr @click="expand(!isExpanded);">
        <td v-for="(h, i) in headers" :key="h.value"
          :style="rowColor(item.type)" class="text-start"
        >
          <v-chip
            v-if="isChip(h.value)"
            :color="chipColor(item[h.value])"
          >
            {{ item[h.value] }}
          </v-chip>
          <span v-else-if="h.value === 'count'">
            {{ item.events.length }}
          </span>
          <span v-else>
            {{ item[h.value] }}
          </span>
          <v-icon v-if="i === headers.length - 1">
            {{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </td>
      </tr>
    </template>
    <template v-slot:expanded-item="{ item, headers }">
      <v-expand-transition v-for="event in item.events" :key="event.date">
      <tr class="detail-row" style="background-color: #616161;">
        <td v-if="headers.find(h => h.value === 'type')">
          {{ event.date.slice(5) }}</td>
        <td colspan="2">
          <a :href="event.url" target="new" class="event-link">
          {{ event.name }}
          </a>
        </td>
        <td v-if="headers.find(h => h.value === 'avgBuys')">
          {{ event.buys }}</td>
        <td class="growth">
          <span :style="`color: ${chipColor(event.growth)}`">
            {{ Math.round(event.growth * 100) / 100 }}
          </span>
        </td>
        <td class="growth">
          <span :style="`color: ${chipColor(event.adjGrowth)}`">
            {{ Math.round(event.adjGrowth * 100) / 100 }}
          </span>
        </td>
        <td class="growth"></td>
      </tr>
      </v-expand-transition>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'PersonalTable',
  props: ['headers', 'items'],
  data() {
    return {
    };
  },
  computed: {
    modHeaders() {
      const headers = this.headers
        .concat([{ text: '', value: 'data-table-expand' }]);
      return headers;
    },
  },
  methods: {
    chipColor(float) {
      if (float < -3) return '#E57373';
      if (float > 3) return '#81C784';
      return '';
    },
    rowColor(type) {
      if (type !== 'headlining') return 'background-color: rgba(66, 66, 66, 0.1);';
      return '';
    },
    isChip(key) { return key === 'avgGrow' || key === 'avgAdj'; },
  },
};
</script>

<style lang="scss" scoped>
.detail-row {
  color: #eeeeee;
  td { padding-left: 20px; }
  .growth {
    background-color: #424242;
    padding-left: 36px;
    color: #e0e0e0;
  }
}
.event-link {
  padding: 4px;
  color: #eeeeee;
  background-color: #424242;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #fafafa;
    background-color: #212121;
  }
}
</style>
