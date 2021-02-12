<template>
  <v-navigation-drawer
      v-model="drawer"
      src="../../assets/images/hrestyk.jpg"
      dark
      app
  >
    <template v-slot:img="props">
      <v-img
          gradient="to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)"
          v-bind="props"
      />
    </template>

    <v-divider class="mb-1"/>

    <v-list expand nav>
      <v-list-item link to="/">
        <v-list-item-avatar
            class="align-self-center"
            color="#fff"
            contain
        >
          <v-img
              src="../../assets/images/logo.png"
              max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
              v-text="'Хрестик'"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2"/>


    <v-list expand nav>
      <v-list-item v-for="(link, i) in links" :key="`drawer-link-${i}`" link :to="link.route">
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "CoreDrawer",
  data() {
    return {
      links: [
        {
          icon: 'mdi-store',
          title: 'Товари',
          route: '/products'
        },
        {
          icon: 'mdi-folder-multiple-image',
          title: 'Слайдер',
          route: '/main-slider'
        },
        {
          icon: 'mdi-cart',
          title: 'Замовлення',
          route: '/orders'
        },
        {
          icon: 'mdi-cog',
          title: 'Налаштування',
          route: '/settings'
        },
      ]
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer
      },
      set(val) {
        this.$store.commit('SET_DRAWER', val)
      },
    },
  }
}
</script>

<style scoped>

</style>