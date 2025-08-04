const Component = require('../models/Component');

// Add new component
exports.addComponent = async (req, res) => {
  try {
    const newComponent = new Component(req.body);
    await newComponent.save();
    res.status(201).json({ msg: 'Component added successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding component', error: err.message });
  }
};

// Get all components (with search/filter)
exports.getComponents = async (req, res) => {
  try {
    const filters = req.query;
    const components = await Component.find(filters);
    res.json(components);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching components', error: err.message });
  }
};

// Edit a component
exports.updateComponent = async (req, res) => {
  try {
    const updated = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating component', error: err.message });
  }
};
