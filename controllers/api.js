const { mongo } = require('../services/db');


exports.getCurrentCount = (req, res, next) => {
  mongo((err, db) => {
    if (err) console.error(err);
    else {
      db.collection('lot__count')
        .findOne({ "lot_id" : req.params.id }, (err, doc) => {
          if (err) console.error(err);
          else res.json( doc );
      });
    }
  });
};

exports.getHistoricalData = (req, res, next) => {
  mongo((err, db) => {
    if (err) console.error(err);
    else {
      db.collection('lot')
        .find({ "lot_id" : req.params.id }, (err, doc) => {
          if (err) console.error(err);
          else res.json( doc );
        });
    }
  });
};

