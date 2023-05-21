<template>
  <v-dialog
    v-model="internalHistoryDialog"
    width="500"
    content-class="history-dialog"
  >
    <v-card>
      <v-card-title class="subtitle-1 font-weight-bold grey lighten-2">
        History
      </v-card-title>

      <v-card-text v-if="news.length > 0">
        <v-list three-line v-for="(item, index) in news" :key="index">
          <v-list-item :to="`/details/${item.id}`">
            <v-list-item-avatar>
              <v-img :src="item.urlToImage || defaultImage"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset />
        </v-list>
      </v-card-text>

      <v-card-text>
        <h3>No history found.</h3>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
const defaultImage = require('../assets/default-image.png');

export default {
  name: 'HistoryDialog',
  data() {
    return {
      defaultImage,
      // internalHistoryDialog: false,
    };
  },
  props: {
    value: Boolean,
    news: {
      type: Array,
      required: true,
    },
  },
  computed: {
    internalHistoryDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style>
div:has(.history-dialog).v-dialog__content{
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-end !important;
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
