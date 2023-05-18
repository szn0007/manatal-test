<template>
  <v-app-bar
    app
    dark
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

      <v-icon
        large
        color="black"
      >
        mdi-magnify
      </v-icon>
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
</style>
