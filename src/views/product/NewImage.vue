<template>
  <v-card min-height="100%" class="d-flex justify-center align-center mb-3">
    <v-card-actions>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              dark
              depressed
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click.prevent="addPic"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Додати картинку</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
name: "NewImage",
  methods: {
    addPic() {
      alert("Add a pic please!");
    },
  }
}
</script>

<style scoped>

</style>