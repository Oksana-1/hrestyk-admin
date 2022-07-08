<template>
  <div>
    <div v-if="customer.name" class="mb-3 black--text">
      Ім'я: <span class="font-weight-light">{{ customer.name }}</span>
    </div>
    <div v-if="customer.phone" class="mb-3 black--text">
      Телефон: <span class="font-weight-light">{{ customer.phone }}</span>
    </div>
    <div v-if="customer.email" class="mb-3 black--text">
      Email:
      <a :href="customer.email"
        ><span class="font-weight-light">{{ customer.email }}</span></a
      >
    </div>
  </div>
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
