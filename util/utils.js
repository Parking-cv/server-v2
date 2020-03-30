/**
 * Converts a date object into a unix timestamp. Useful for inserting
 * timestamps into mongo, since aggregations must be used in order to
 * convert date strings to timestamps
 * @param {Date} date Date to convert
 * @returns {number}  Unix timestamp
 */
exports.unixDate = (date) => {
  return Math.floor(date / 1000);
};
