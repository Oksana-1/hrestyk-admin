<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <BaseCard header-type="avatar" icon-name="mdi-cart">
          <template v-slot:card-content>
            <v-row class="pa-6">
              Тут буде сторінка замовлень
            </v-row>
          </template>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Orders",
  components: {
    BaseCard
  },
  data() {
    return {
      busy: false,
    }
  },
  computed: {
    ...mapGetters(["orders"]),
  },
  methods: {
    ...mapActions(["getOrders"]),
    async init() {
      this.busy = true;
      try {
        await this.getOrders();
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

</style>