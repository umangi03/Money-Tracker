import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

// Add a new transaction
router.post('/', async (req, res) => {
  const { title, amount, type, dateTime, description } = req.body;

  if (!title || !amount || !type || !dateTime) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  try {
    const newTransaction = new Transaction({
      title,
      amount,
      type,
      dateTime,
      description,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
});

// Edit a transaction
router.put('/:id', async(req, res)=>{
  const updatedData= req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, updatedData, {new: true});
    if(!transaction)
      return res.status(404).send("Transaction not found");
    res.status(200).json({message: 'Transaction is updated', transaction});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating transaction");
  }
});

// Delete a transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error });
  }
});

export default router;
