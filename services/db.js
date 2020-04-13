const MongoClient = require('mongodb').MongoClient;

let DB = undefined;

exports.mongo = (cb) => {
  if (DB === undefined) {
    MongoClient.connect(process.env.MONGO_URI, (err, client) => {
      if (err) cb(err, null);
      else {
        DB = client.db(process.env.MONGO_DB);
        cb(null, DB);
      }
    });
  } else {
    cb(null, DB);
  }
};

exports.mongoConnect = () => {
  return new Promise((resolve, reject) => {
    if (DB === undefined) {
      MongoClient.connect(process.env.MONGO_URI, (err, client) => {
        if (err) reject(err);
        else {
          DB = client.db(process.env.MONGO_DB);
          resolve(DB);
        }
      });
    } else {
      resolve(DB);
    }
  });
};
