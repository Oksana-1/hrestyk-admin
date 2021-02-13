<template>
  <v-card class="fill-height">
    <v-responsive min-width="100%" :aspect-ratio="1">
      <v-card-actions class="justify-center mb-3 flex-shrink-0 fill-height">
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
    </v-responsive>
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