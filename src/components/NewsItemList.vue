<template lang="">
  <v-row>
    <v-col cols="8">
      <v-card flat>
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
    </v-col>
    <v-col cols="4">
      <router-link :to="`/details/${news.id}`">
        <v-img
          class="news-image"
          :src="news.urlToImage || defaultImage"
        ></v-img>
      </router-link>
    </v-col>
  </v-row>
</template>
<script>
const defaultImage = require('../assets/default-image.png');

export default {
  name: 'NewsItemList',
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
