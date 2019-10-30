<template>
  <v-data-table
    :headers="modHeaders" :items="items"
    sort-by="events.length" sort-desc
    :show-expand="false" :single-expand="false"
    calculate-widths
  >
    <template v-slot:item="{ item, index, isExpanded, expand }">
      <tr @click="expand(!isExpanded)">
        <td class="text-start">{{ index + 1 }}</td>
        <td class="text-start">
          <router-link :to="`/wrestler/${item.wrestler.id}`"
            class="profile-link"
          >{{ item.wrestler.name }}</router-link>
        </td>
        <td class="text-start">{{ item.year }}</td>
        <td class="text-start">{{ item.events.length }}</td>
        <td class="text-start">{{ item.avgBuys }}</td>
        <td class="text-start">
          <v-chip :color="chipColor(item.avgGrow)">
            {{ item.avgGrow }}
          </v-chip>
        </td>
        <td class="text-start">
          <v-chip :color="chipColor(item.avgAdj)">
            {{ item.avgAdj }}
          </v-chip>
        </td>
        <td>
          <v-icon>
            {{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </td>
      </tr>
    </template>
    <template v-slot:expanded-item="{ item, headers }">
      <v-expand-transition v-for="event in item.events" :key="event.date">
      <tr class="detail-row" style="background-color: #616161;">
        <td>
          {{ event.date.slice(5) }}</td>
        <td colspan="3">
          <a :href="event.url" target="new" class="event-link">
          {{ event.name }}
          </a>
        </td>
        <td>
          {{ event.buys }}</td>
        <td class="growth">
          <span :style="`color: ${chipColor(event.growth)}`">
            {{
              event.growth === null ? '' : Math.round(event.growth * 100) / 100
            }}
          </span>
        </td>
        <td class="growth">
          <span :style="`color: ${chipColor(event.adjGrowth)}`">
            {{
              event.adjGrowth === null ? '' : Math.round(event.adjGrowth * 100) / 100
            }}
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
  name: 'MainTable',
  props: ['headers', 'items'],
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
.profile-link {
  padding: 4px;
  color: #424242;
  background-color: #eeeeee;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #000;
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
