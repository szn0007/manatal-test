import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ff0505',
        secondary: '#b0bec5',
        anchor: '#8c9eff',
      },
    },
  },
});
