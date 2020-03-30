const LotMap = require('../services/LotMap');

exports.reset = (req, res) => {
  LotMap.reset(req.params.lotId, req.body.count, (err) => {
    if (err) res.status(500).json({ err });
    else res.json({ success: true });
  })
};

