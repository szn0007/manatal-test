<template>
  <v-app-bar
    app
    color="white"
    height="72"
  >
    <div class="container header-container">
      <router-link to="/">
        <v-img
          alt="ABC News"
          src="../assets/abc-news.png"
          max-width="120px"
        />
      </router-link>

      <v-spacer />

      <v-text-field
        solo-inverted
        dense
        label="Search News"
        prepend-inner-icon="mdi-magnify"
        hide-details
      ></v-text-field>
    </div>

  </v-app-bar>
</template>

<script>
export default {
};
</script>
<style>
.header-container{
  padding: 0 !important;
  display: flex;
  justify-content: space-between;
}
.header-container .v-input{
  align-items: center;
  max-width: 400px;
}
.theme--light.v-text-field--solo-inverted.v-input--is-focused > .v-input__control > .v-input__slot {
  background: #ffffff;
}
.theme--light.v-text-field--solo-inverted.v-input--is-focused > .v-input__control > .v-input__slot input {
  color: rgba(0, 0, 0, 0.87);
}
.theme--light.v-text-field--solo-inverted.v-input--is-focused > .v-icon {
  color: rgba(0, 0, 0, 0.87);
}
</style>
