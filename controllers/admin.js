const LotStore = require('../services/LotStore');

/**
 * Reset the count to a specified number for a lot
 * @param req
 * @param res
 */
exports.reset = (req, res) => {
  LotStore.reset(req.params.lotId, req.body.count, (err) => {
    if (err) res.status(500).json({ err });
    else res.json({ success: true });
  })
};

