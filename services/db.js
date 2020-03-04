const MongoClient = require('mongodb').MongoClient;

let DB = undefined;

// TODO reuse connection
exports.mongo = (cb) => {
  if (DB === undefined) {
    MongoClient.connect(process.env.MONGO_URI, (err, client) => {
      if (err) cd(err, null);
      else {
        DB = client.db("diddle_north");
        cb(null, DB);
      }
    });
  } else {
    cb(null, DB);
  }
};
