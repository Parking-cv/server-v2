const LotStore = require('../services/LotStore');

exports.reset = (req, res) => {
  LotStore.reset(req.params.lotId, req.body.count, (err) => {
    if (err) res.status(500).json({ err });
    else res.json({ success: true });
  })
};

