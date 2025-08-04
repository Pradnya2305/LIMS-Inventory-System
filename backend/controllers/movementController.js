const Movement = require('../models/Movement');
const Component = require('../models/Component');

// Inward Movement
exports.logInward = async (req, res) => {
  try {
    const { componentId, quantity } = req.body;
    console.log('Received:', { componentId, quantity });

    const component = await Component.findById(componentId);
    if (!component){
      console.log('Component not found');
      return res.status(404).json({ msg: 'Component not found' });
    }

    component.quantity += parseInt(quantity);
    component.lastUsedAt = new Date();
    await component.save();

    const movement = new Movement({
      componentId,
      type: 'inward',
      quantity,
      user: req.user.role
    });
    await movement.save();

    res.status(201).json({ msg: 'Inward movement recorded' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Outward Movement
exports.logOutward = async (req, res) => {
  try {
    const { componentId, quantity } = req.body;
    console.log('Received:', { componentId, quantity });

    const component = await Component.findById(componentId);
    if (!component){
      console.log('Component not found');
      return res.status(404).json({ msg: 'Component not found' });
    }

    if (component.quantity < quantity) {
      return res.status(400).json({ msg: 'Not enough stock' });
    }

    component.quantity -= parseInt(quantity);
    component.lastUsedAt = new Date();
    await component.save();

    const movement = new Movement({
      componentId,
      type: 'outward',
      quantity,
      user: req.user.role
    });
    await movement.save();

    res.status(201).json({ msg: 'Outward movement recorded' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
