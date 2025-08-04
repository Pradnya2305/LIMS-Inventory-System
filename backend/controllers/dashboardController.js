const Component = require('../models/Component');
const Movement = require('../models/Movement');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalComponents = await Component.countDocuments();

    const allComponents = await Component.find();
    const totalQuantity = allComponents.reduce((sum, c) => sum + c.quantity, 0);

    const lowStock = allComponents.filter(c => c.quantity < c.criticalLowThreshold).length;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const inward = await Movement.aggregate([
      { $match: { type: 'inward', timestamp: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);

    const outward = await Movement.aggregate([
      { $match: { type: 'outward', timestamp: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);

    res.json({
      totalComponents,
      totalQuantity,
      lowStock,
      inwardThisMonth: inward[0]?.total || 0,
      outwardThisMonth: outward[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ msg: 'Dashboard fetch failed', error: err.message });
  }
};
