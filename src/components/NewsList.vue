<template>
  <v-container>
    <v-row>
      <h1 class="section-title mb-4">
        Latest
        <svg class="svg-inline--fa fa-arrow-right fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
      </h1>

      <v-spacer></v-spacer>

      <v-btn
        depressed
        color="primary"
        class="mr-4"
        @click="historyDialog = true"
      >
        History
      </v-btn>

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

      <v-dialog
        v-model="historyDialog"
        width="500"
        content-class="history-dialog"
      >
        <v-card>
          <v-card-title class="subtitle-1 font-weight-bold grey lighten-2">
            History
          </v-card-title>

          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
              ></v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item
                v-else
                :key="item.title"
              >
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>

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
            @input="handlePaginationInput"
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
      menu: false,
      selectedSources: [],
      historyDialog: false,
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: '<span class="text--primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: '<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
  components: {
    NewsItemGrid,
    NewsItemList,
  },
  computed: {
    ...mapGetters(['getLatestHeadlines', 'getTotalPages', 'sources', 'isfilterBySource']),
  },
  mounted() {
    this.fetchLatestHeadlines(this.page);
    this.fetchSources();
  },
  methods: {
    ...mapActions(['fetchLatestHeadlines', 'fetchSources', 'fetchHeadlinesBySources']),
    resetSelectedSources() {
      this.selectedSources = [];
      this.fetchLatestHeadlines(this.page);
    },
    filterBySource() {
      const sources = this.selectedSources.join(',');
      const payload = {
        sources,
        page: this.page,
      };
      this.fetchHeadlinesBySources(payload);
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
  min-width: 200px;
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
.v-dialog__content{
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}
.history-dialog{
  max-height: 100% !important;
  height: 100%;
  margin: 0;
}
.history-dialog .v-card{
  height: 100%;
}
</style>
