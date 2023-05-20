<template lang="">
  <v-row class="news-item-list-row">
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
          <span class="news-meta__date">{{ formatDate(news.publishedAtpublishedAt) }}</span>
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
      <v-btn
        fab
        dark
        x-small
        color="primary"
        @click="editTitle"
      >
        <v-icon color="white">mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        x-small
        color="primary"
        :to="`/details/${news.id}`"
      >
        <v-icon color="white">mdi-redo</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-dialog
      v-model="editTitleDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h6 primary white--text" dense>
          Privacy Policy

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
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
import dateMixin from '@/mixins/DateMixin';

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
.news-item-list-row{
  position: relative;
}
</style>
