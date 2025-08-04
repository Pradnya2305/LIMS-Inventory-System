const Component = require('../models/Component');

// ✅ Low stock alert
exports.getLowStockAlerts = async (req, res) => {
  try {
    const components = await Component.find();
    const lowStock = components.filter(
      (c) => Number(c.quantity) <= Number(c.criticalLowThreshold)
    );
    res.json(lowStock);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching low stock alerts', error: err.message });
  }
};

// ✅ Old stock alert
exports.getOldStockAlerts = async (req, res) => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const oldStock = await Component.find({
      lastUsedAt: { $lte: threeMonthsAgo }
    });

    res.json(oldStock);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching old stock alerts', error: err.message });
  }
};
