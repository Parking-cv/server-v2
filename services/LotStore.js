let lots = {};

/**
 * Add an event to the current lot count
 * @param lotId
 * @param data
 * @param cb
 */
exports.record = (lotId, data, cb) => {
  let cnt = parseInt(data);
  if (isNaN(cnt)) cb(new Error("Not a number"));
  if (lots[lotId] === undefined)
    lots[lotId] = cnt;
  else {
    lots[lotId] += cnt;
  }
  cb(null);
};

/**
 * Get the current count for a lot
 * @param lotId
 * @param cb
 */
exports.get = (lotId, cb) => {
  if (lots[lotId] === undefined)
    cb(new Error("No lot with that id found."), null);
  else
    cb(null, lots[lotId]);
};

/**
 * Reset the count for a lot
 * @param lotId
 * @param count
 * @param cb
 */
exports.reset = (lotId, count, cb) => {
  if (lots[lotId] === undefined)
    cb(new Error("Lot ID not found"));
  else
    lots[lotId] = count;
  cb(null);
};
