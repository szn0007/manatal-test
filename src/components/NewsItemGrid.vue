<template>
  <v-card flat>
    <router-link :to="`/details/${news.id}`">
      <v-img
        class="news-image"
        :src="news.urlToImage || defaultImage"
        v-if="news.urlToImage"
      ></v-img>
    </router-link>

    <div class="news-source">
      {{ news.source?.name }}
    </div>
    <router-link :to="`/details/${news.id}`">
      <h2 class="news-title">
        {{ news.title }}
      </h2>
    </router-link>
    <p class="news-description">
      {{ news.description }}
    </p>
    <div class="news-meta">
      <span class="news-meta__author">{{ news.author || 'Anonymous' }}</span>
      <span class="divider"> | </span>
      <span class="news-meta__date">{{ news.publishedAt }}</span>
    </div>
  </v-card>
</template>
<script>
const defaultImage = require('../assets/default-image.png');

export default {
  name: 'NewsItemGrid',
  props: {
    news: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      defaultImage,
    };
  },
};
</script>
<style>
</style>
