<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="date"
    style="max-width: 1600px;" dark
  >
    <template v-slot:top>
      <v-dialog v-model="editDialog" width="500px" persistent>
        <v-card color="#e0e0e0" style="padding: 16px;">
          <v-subheader>Headliners: </v-subheader>
          <v-select
            v-model="editItem.headliners"
            :items="editItem.roster"
            multiple
          ></v-select>
          <v-divider></v-divider>
          <v-subheader>Features: </v-subheader>
          <v-select
            v-model="editItem.features"
            :items="editItem.roster"
            multiple
          ></v-select>
          <v-btn color="#f5f5f5" @click="save" style="margin-right: 32px;">save</v-btn>
          <v-btn color="red" @click="editDialog = false">cancel</v-btn>
        </v-card>
      </v-dialog>
      <v-btn dark @click="download">download</v-btn>
    </template>
    <template v-slot:item.headliners="{ item }">
      <a @click="edit(item)" style="color: #e0e0e0;">{{ arr2list(item.headliners) }}</a>
    </template>
    <template v-slot:item.features="{ item }">
      {{ arr2list(item.features) }}
    </template>
  </v-data-table>
</template>

<script>
import data from '../data';

export default {
  data() {
    return {
      items: data.mainCards,
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Event', value: 'name' },
        { text: 'Headliners', value: 'headliners' },
        { text: 'Features', value: 'features' },
      ],
      editDialog: false,
      editItem: {},
    };
  },
  methods: {
    arr2list(arr) {
      if (!arr || arr.length < 1) return '';
      let htmlStr = '';
      for (let i = 0; i < arr.length; i += 1) {
        const name = this.id2name(arr[i]);
        if (name) htmlStr += `${name}, `;
      }
      return htmlStr;
    },
    id2name(id) {
      const wrestler = data.roster.find(w => w.id === id);
      return (wrestler) ? wrestler.name : id;
    },
    getRoster(date) {
      const cards = data.eventCards.filter(c => c.date === date);
      const roster = [];
      cards.sort((a, b) => a.order - b.order).forEach(c => roster.push(...c.wrestlers));
      return roster;
    },
    edit(item) {
      this.editItem.index = this.items.findIndex(i => i.date === item.date);
      this.editItem.headliners = item.headliners;
      this.editItem.features = item.features;
      this.editItem.roster = this.getRoster(item.date)
        .map((value) => {
          const ob = { value, text: this.id2name(value) };
          return ob;
        });
      this.editDialog = true;
    },
    save() {
      const { index, headliners, features } = this.editItem;
      this.items[index].headliners = headliners;
      this.items[index].features = features;
      this.editDialog = false;
    },
    download() {
      const fileName = 'maincards_fixed.js';
      const jsonData = JSON.stringify(this.items.map((card) => {
        const {
          date, name, headliners, features,
        } = card;
        return {
          date,
          name,
          headliners: headliners.join(', '),
          features: features.join(', '),
        };
      }));
      const jsStr = `module.exports = ${jsonData}`;
      const ele = document.createElement('a');
      ele.setAttribute('href',
        `data:text/plain;charset=utf-8,${encodeURIComponent(jsStr)}`);
      ele.setAttribute('download', fileName);

      ele.style.display = 'none';
      document.body.appendChild(ele);

      ele.click();

      document.body.removeChild(ele);
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: #e0e0e0;
  text-decoration: none;
  &:hover {
    color: #f5f5f5;
  }
}
</style>
