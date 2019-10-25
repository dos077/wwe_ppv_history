<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerOn"
      dark
      app
      style="background: linear-gradient(145deg, #880E4F, #1A237E)"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Biggest Draws
          </v-list-item-title>
          <v-list-item-subtitle>
            in WWE Pay-Per-View Era
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <nav-items></nav-items>
    </v-navigation-drawer>
    <v-content app>
      <router-view v-on:callDrawer="drawerOn = !drawerOn"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavItems from './views/components/NavItems.vue';

export default {
  name: 'App',
  components: {
    'nav-items': NavItems,
  },
  data: () => ({
    drawerOn: null,
  }),
};
</script>
