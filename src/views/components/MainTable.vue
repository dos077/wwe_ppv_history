<template>
  <v-data-table
    :headers="modHeaders" :items="items"
    sort-by="avgGrow" sort-desc
    calculate-widths :mobile-breakpoint="1"
  >
    <template v-slot:item="{ item, index }">
      <tr>
        <td v-if="!isMobile" class="text-start">{{ index + 1 }}</td>
        <td class="text-start">
          <router-link :to="`/wrestler/${item.id}`"
            class="profile-link"
          >{{ item.name }}</router-link>
        </td>
        <td class="text-start">{{ item.count }}</td>
        <td class="text-start">{{ item.totalBuys }}</td>
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
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'MainTable',
  props: ['headers', 'items'],
  methods: {
    chipColor(float) {
      if (float < -3) return '#E57373';
      if (float > 3) return '#81C784';
      return '';
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    modHeaders() {
      if (this.isMobile) return this.headers;
      return [{ text: 'Rank', value: 'rank' }].concat(this.headers);
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
