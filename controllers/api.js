const { mongo } = require('../services/db');
const LotStore = require('../services/LotStore');

/**
 * Determine if a given string is valid date by parsing the string.
 * If it is valid, return the Date object. Otherwise return null
 * @param {String} dateString
 * @returns {null|Date}
 */
function validDateOrNull(dateString) {
  let d = new Date(dateString);

  if (d.toString() === 'Invalid Date') {
    return null;
  }

  return d;
}


exports.getCurrentCount = (req, res) => {
  LotStore.get(req.params.lotId, (err, count) => {
    if (err) res.status(404).json({ err });
    else res.json({ count });
  });
};

exports.getHistoricalData = (req, res) => {
  mongo((err, db) => {
    if (err) res.status(500).json({ err });
    else {
      const max = validDateOrNull(req.query.max) || new Date();
      const min = validDateOrNull(req.query.min) || new Date('1970');
      db.collection(req.params.lotId)
        .find({
          timestamp: {
            $gte : min,
            $lte : max
          }
        })
        .toArray((err, docs) => {
          if (err) res.status(500).json({ err });
          else res.json( docs );
        });
    }
  });
};
