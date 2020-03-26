const { mongo } = require('../services/db');
const LotMap = require('../services/LotMap');


exports.getCurrentCount = (req, res, next) => {
  LotMap.get(req.params.id, (err, count) => {
    if (err) res.status(404).json({ err });
    else res.json({ count });
  });
};

exports.getHistoricalData = (req, res, next) => {
  mongo((err, db) => {
    if (err) res.status(500).json({ err });
    else {
      db.collection('lot')
        .find()
        .toArray((err, docs) => {
          if (err) res.status(500).json({ err });
          else res.json( docs );
        });
    }
  });
};
