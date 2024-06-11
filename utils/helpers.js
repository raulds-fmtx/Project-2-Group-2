const moment = require("moment");

module.exports = {
  format_date: (date) => {
    return moment(date).format("MMMM Do, YYYY [at] h:mm A");
  },
  equals: (arg1, arg2) => {
    return arg1 === arg2;
  }
};
