const WorkOrderModel = require('../models/WorkOrderSchema');

const getWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrderModel.find();
    res.status(200).json(workOrders);
  } catch (err) {
    res.status(500).json({ error: 'Could not find work orders' });
  }
};

const createWorkOrder = async (req, res) => {
  try {
    const newWorkOrder = new WorkOrderModel(req.body);
    await newWorkOrder.save();
    res.status(201).json(newWorkOrder);
  } catch (err) {
    console.error('Error creating work order:', err);
    res.status(500).json({ error: 'Could not create work order', details: err.message });
  }
};

const deleteWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await WorkOrderModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Work order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete work order', details: err.message });
  }
};

module.exports = { getWorkOrders, createWorkOrder, deleteWorkOrder };
