<template>
  <v-card flat>
    <router-link :to="`/details/${news.id}`">
      <v-img
        class="news-image"
        :src="news.urlToImage || defaultImage"
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
      <span class="news-meta__date">{{ formatDate(news.publishedAt) }}</span>
    </div>

    <v-speed-dial
      v-model="fab"
      top
      right
      direction="top"
      open-on-hover
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
          x-small
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </template>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="editTitle"
          >
          <v-icon color="white">mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit Title</span>
      </v-tooltip>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="primary"
            v-bind="attrs"
            v-on="on"
            :to="`/details/${news.id}`"
          >
            <v-icon color="white">mdi-redo</v-icon>
          </v-btn>
        </template>
        <span>View News</span>
      </v-tooltip>
    </v-speed-dial>

    <v-dialog
      v-model="editTitleDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h6 primary white--text" dense>
          Edit News Title

          <v-spacer></v-spacer>

          <v-btn
            icon
            dark
            @click="editTitleDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-8">
          <v-text-field
            v-model="title"
            label="Title"
            ref="title"
            outlined
            clearable
            :rules="rules"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            depressed
            @click="editTitleDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            :disabled="title.trim().length > 255 || title.trim().length === 0"
            depressed
            color="primary"
            @click="updateTitle"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>
<script>
import { mapActions } from 'vuex';
import dateMixin from '@/mixins/DateMixin';

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
      fab: false,
      editTitleDialog: false,
      title: '',
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value || '').length <= 255 || 'Max 255 characters',
      ],
    };
  },
  methods: {
    ...mapActions(['setTitle']),
    editTitle() {
      this.editTitleDialog = true;
      this.title = this.news.title;
    },
    updateTitle() {
      this.setTitle({
        id: this.news.id,
        title: this.title,
      });
      this.editTitleDialog = false;
    },
  },
  mixins: [
    dateMixin,
  ],
};
</script>
<style>
.v-speed-dial{
  position: absolute;
}
</style>
