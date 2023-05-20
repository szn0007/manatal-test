<template lang="">
  <div class="container-wrapper">
    <article>
      <section class="article-header">
        <div class="article-meta">
          <span class="article-meta__source">
            {{ articleData?.source?.name || 'Anonymous' }}
          </span>
          <span class="article-meta__date">
            {{ formatDate(articleData?.publishedAt) }}
          </span>
        </div>

        <h1>{{ articleData.title }}</h1>
      </section>
      <section class="article-featured-image">
        <v-img :src="articleData.urlToImage || defaultImage" />
      </section>
      <section class="article-content">
        {{ articleData.content }}
      </section>
    </article>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import dateMixin from '@/mixins/DateMixin';

const defaultImage = require('../assets/default-image.png');

export default {
  name: 'DetailView',
  computed: {
    ...mapGetters(['getDetails']),
    articleData() {
      return this.getDetails(this.$route.params.id);
    },
  },
  data() {
    return {
      defaultImage,
    };
  },
  methods: {
    ...mapActions(['setHistory']),
  },
  created() {
    this.setHistory({
      id: this.$route.params.id,
    });
  },
  mixins: [
    dateMixin,
  ],
};
</script>
<style>
.container-wrapper {
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
  width: 100%;
  padding: 60px 40px;
}
.article-header h1 {
  font-size: 56px;
  line-height: 1.07143;
  font-weight: 700;
  letter-spacing: -.005em;
  text-align: center;
  margin-bottom: 32px;
}
.article-meta {
  margin-top: 0;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 700;
  letter-spacing: -.01em;
}
.article-meta__source {
  color: #141414;
  display: flex;
  align-items: center;
  margin: 4px 0;
  text-transform: uppercase;
}
.article-meta__source::after {
  content: '';
  display: inline-block;
  height: 1em;
  width: 1px;
  margin: 0 10px;
  background-color: #616161;
}
.article-meta__date {
  color: #616161;
  margin: 4px 0;
}
.article-featured-image {
  margin: 40px 0 60px;
}
.article-featured-image .v-image {
  margin: 0 auto;
  max-width: 720px;
  border-radius: 8px;
}
</style>
