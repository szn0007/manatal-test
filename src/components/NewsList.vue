<template>
  <v-container>
    <v-row class="px-4">
      <h1 class="section-title mb-4">
        Latest
        <svg class="svg-inline--fa fa-arrow-right fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
      </h1>

      <v-spacer></v-spacer>

      <div class="header-button">
        <!-- Error API Call Button -->
        <v-btn
          depressed
          color="secondary"
          class="mr-2"
          @click="errorAPICall"
        >
          Error API Call
        </v-btn>

        <!-- History Dialog Button -->
        <v-btn
          depressed
          color="primary"
          class="mr-2"
          @click="historyDialog = true"
        >
          History
        </v-btn>

        <!-- Source Filter Button -->
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="400"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="indigo"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Filter
              <v-icon
                right
                dark
              >
                mdi-filter
              </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-title class="subtitle-1 font-weight-bold">
                  Filter by Sources
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list class="px-4">
              <v-autocomplete
                v-model="selectedSources"
                :items="sources"
                item-text="name"
                item-value="id"
                chips
                clearable
                deletable-chips
                multiple
              ></v-autocomplete>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                @click="resetSelectedSources"
              >
                Reset
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="filterBySource"
              >
                Apply
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>

      <history-dialog
      :news="getVisitedNews"
      v-model="historyDialog"
      />
    </v-row>

    <v-row v-if="getLatestHeadlines.length > 0">
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

      <!-- Pagination -->
      <template>
        <div class="pagination-wrapper" v-if="getTotalPages > 0">
          <v-pagination
            v-model="page"
            :length="getTotalPages"
            @input="handlePaginationInput"
          ></v-pagination>
        </div>
      </template>
    </v-row>

    <v-row v-else class="flex-column mt-4">
      <v-img src="../assets/no-data.svg" height="500" contain />
      <h3 class="text-center">Please try again in a while........</h3>
    </v-row>

    <v-overlay
      :opacity="0.5"
      v-if="loading"
    >
      <v-progress-circular
        indeterminate
        :size="70"
        :width="7"
        color="purple"
      ></v-progress-circular>
    </v-overlay>

  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import NewsItemGrid from '@/components/NewsItemGrid.vue';
import NewsItemList from '@/components/NewsItemList.vue';
import HistoryDialog from './HistoryDialog.vue';

const defaultImage = require('../assets/default-image.png');

export default {
  name: 'NewsList',
  data() {
    return {
      page: 1,
      menu: false,
      selectedSources: [],
      historyDialog: false,
      defaultImage,
    };
  },
  components: {
    NewsItemGrid,
    NewsItemList,
    HistoryDialog,
  },
  computed: {
    ...mapState({
      loading: (state) => state.news.loading,
    }),
    ...mapGetters(['getLatestHeadlines', 'getTotalPages', 'sources', 'isfilterBySource', 'getVisitedNews']),
  },
  mounted() {
    this.fetchLatestHeadlines(this.page);
    this.fetchSources();
  },
  methods: {
    ...mapActions(['fetchLatestHeadlines', 'fetchSources', 'fetchHeadlinesBySources', 'errorAPICall']),
    resetSelectedSources() {
      console.log('here');
      this.selectedSources = [];
      this.menu = false;
      this.fetchLatestHeadlines(this.page);
    },
    filterBySource() {
      const sources = this.selectedSources.join(',');
      const payload = {
        sources,
        page: this.page,
      };
      this.fetchHeadlinesBySources(payload);
      this.menu = false;
    },
    handlePaginationInput() {
      if (this.isfilterBySource) {
        this.filterBySource();
      } else {
        this.fetchLatestHeadlines(this.page);
      }
    },
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
  font-size: 12px;
}
.news-title ,.news-description{
  line-height: 135%;
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
  min-width: 200px;
  max-height: 200px;
}
.hero-news .v-image{
  max-height: 100%;
}
.pagination-wrapper{
  width: 100%;
  text-align: center;
  margin: 40px 0;
}
#webpack-dev-server-client-overlay{
  display: none !important;
}
@media only screen and (max-width: 600px) {
  .col-6, .col-4, .col-8{
    flex: 0 0 100%;
    max-width: 100%;
  }
  .news-item-list-row{
    flex-direction: column-reverse;
  }
  .section-title{
    width: 100%;
  }
  .header-button button{
    margin-bottom: 8px;
  }
  .col .v-card{
    border-bottom: 1px solid #efefef;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
}
</style>
