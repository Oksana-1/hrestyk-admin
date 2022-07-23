<template>
  <v-list dense>
    <v-list-item>
      <v-row v-if="customer.name" align="center" no-gutters class="py-1">
        <v-col cols="12">
          <v-list-item-avatar color="grey lighten-3">
            <v-icon>mdi-account</v-icon>
          </v-list-item-avatar>
          <span class="font-weight-light">{{ customer.name }}</span>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row v-if="customer.phone" align="center" no-gutters class="py-1">
        <v-col cols="12">
          <v-list-item-avatar color="grey lighten-3">
            <v-icon>mdi-phone</v-icon>
          </v-list-item-avatar>
          <span class="font-weight-light">{{ customer.phone }}</span>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item>
      <v-row v-if="customer.email" align="center" no-gutters class="py-1">
        <v-col cols="12">
          <v-list-item-avatar color="grey lighten-3">
            <v-icon>mdi-email</v-icon>
          </v-list-item-avatar>
          <a :href="customer.email"
            ><span class="font-weight-light">{{ customer.email }}</span></a
          >
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<script>
import { UserInfo } from "@/entities/Order";

export default {
  name: "CustomerInfo",
  props: {
    customer: UserInfo,
  },
};
</script>

<style scoped></style>
