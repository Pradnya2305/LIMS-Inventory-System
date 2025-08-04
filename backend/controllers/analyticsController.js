const Movement = require('../models/Movement');
const Component = require('../models/Component');

exports.getUsageLast30Days = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const usage = await Movement.aggregate([
      {
        $match: {
          type: 'outward',
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: '$componentId',
          totalUsed: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'components',
          localField: '_id',
          foreignField: '_id',
          as: 'componentDetails'
        }
      },
      { $unwind: '$componentDetails' },
      {
        $project: {
          name: '$componentDetails.name',
          totalUsed: 1
        }
      }
    ]);

    res.json(usage);
  } catch (err) {
    res.status(500).json({ msg: 'Error generating report', error: err.message });
  }
};
