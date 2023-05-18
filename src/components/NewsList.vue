<template>
  <v-container>
    <h1 class="section-title mb-8">
      Latest
      <svg class="svg-inline--fa fa-arrow-right fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
    </h1>

    <v-row>
      <v-col
      :cols="index < 2 ? '6' : '4'"
      :class="(index === 1) ? 'list-news news-card' : (index === 0) ? 'grid-news hero-news news-card' : 'grid-news news-card'"
      v-for="(news, index) in getLatestHeadlines" :key="index">
        <div v-if="index === 1">
          <news-item-list :news="item"
          v-for="(item, i) in news" :key="i"
        />
        </div>
        <news-item-grid :news="news" v-else />
      </v-col>

      <template>
        <div class="pagination-wrapper">
          <v-pagination
            v-model="page"
            :length="getTotalPages"
            @next="fetchLatestHeadlines(page)"
            @previous="fetchLatestHeadlines(page)"
          ></v-pagination>
        </div>
      </template>
    </v-row>

  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NewsItemGrid from '@/components/NewsItemGrid.vue';
import NewsItemList from '@/components/NewsItemList.vue';

export default {
  name: 'NewsList',
  data() {
    return {
      page: 1,
    };
  },
  components: {
    NewsItemGrid,
    NewsItemList,
  },
  computed: {
    ...mapGetters(['getLatestHeadlines', 'getTotalPages']),
  },
  created() {
    this.fetchLatestHeadlines(this.page);
  },
  methods: {
    ...mapActions(['fetchLatestHeadlines']),
  },
};
</script>
<style>
.section-title{
  display: flex;
}
.section-title svg{
  width: 16px;
  color: #ff0505;
  margin-left: 16px;
}
.news-card a{
  color: #000000 !important;
  text-decoration: none;
}
.news-image{
  margin-bottom: 16px;
}
.news-source{
  color: #ff0505;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 8px;
}
.news-description{
  color: #616161;
  margin-bottom: 0.5rem;
  line-height: 135%;
  font-size: 12px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
.news-meta span{
  color: #616161;
  font-size: 12px;
}
.divider{
  color: #616161;
  margin: 0 16px;
}
.list-news h2{
  font-size: 20px;
}
.grid-news {
  margin-top: 16px;
}
.grid-news .v-image{
  max-height: 200px;
}
.hero-news .v-image{
  max-height: 100%;
}
.pagination-wrapper{
  width: 100%;
  text-align: center;
  margin-top: 40px;
}
</style>
