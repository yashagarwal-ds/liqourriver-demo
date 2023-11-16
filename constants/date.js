const moment = require("moment");

const getDate = (dateString) => {
    return moment(dateString).format("HH:MM-DD-MM-YYYY");
  };

module.exports = {getDate}