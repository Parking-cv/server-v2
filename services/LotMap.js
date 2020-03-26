let lots = {};

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

exports.get = (lotId, cb) => {
  if (lots[lotId] === undefined)
    cb(new Error("No lot with that id found."), null);
  else
    cb(null, lots[lotId]);
};
