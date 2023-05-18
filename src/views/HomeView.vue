<template>
  <v-main class="pt-8">
    <news-list />
  </v-main>
</template>

<script>
import NewsList from '@/components/NewsList.vue';

export default {
  name: 'HomeView',
  components: {
    NewsList,
  },
};
</script>
