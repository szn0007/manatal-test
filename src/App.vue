<template>
  <v-app>
    <app-bar />

    <v-main>
      <router-view/>

      <v-dialog
        v-model="showDialog"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Error!!!!!!!!!!!!!!!!

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="showDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="mt-4">
            {{ errorMessage }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="showDialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import { EventBus } from './event-bus';

export default {
  name: 'App',
  data: () => ({
    errorMessage: '',
    showDialog: false,
  }),
  components: {
    AppBar,
  },
  created() {
    // Listen to the event on the event bus to show the error snackbar
    EventBus.$on('showErrorSnackbar', (message) => {
      this.errorMessage = message;
      this.showDialog = true;
    });
  },
};
</script>
