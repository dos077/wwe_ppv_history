<template>
  <v-list nav>
    <v-list-item
      link to="/"
      color="orange lighten-1"
    >
      <v-list-item-icon>
        <v-icon>mdi-kabaddi</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        About This
      </v-list-item-content>
    </v-list-item>
    <v-list-item
      link to="/headliners"
      color="red lighten-1"
    >
      <v-list-item-icon>
        <v-icon>mdi-cards-spade</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        Headliners
      </v-list-item-content>
    </v-list-item>
    <v-list-item
      link to="/features"
      color="blue lighten-1"
    >
      <v-list-item-icon>
        <v-icon>mdi-cards-club</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        Features
      </v-list-item-content>
    </v-list-item>
    <v-list-item
      link to="/byyear"
      color="red lighten-1"
    >
      <v-list-item-icon>
        <v-icon>mdi-timer-sand</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        Headlining Years
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'NavItems',
};
</script>

<style lang="scss" scoped>

</style>
