import moment from 'moment';

export default {
  methods: {
    formatDate(date, format = 'YYYY-MM-DD') {
      return moment(date).format(format);
    },
  },
};
