require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const BudgetItem = require('./models/BudgetItem');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/personalbudget';

mongoose.connect(mongoUri)
  .then(() => console.log('[mongo] connected'))
  .catch(err => {
    console.error('[mongo] connection error:', err.message);
    process.exit(1);
  });

app.get('/budget', async (req, res) => {
  try {
    const items = await BudgetItem.find().sort({ createdAt: 1 }).lean();
    res.json({
      myBudget: items.map(i => ({
        title: i.title,
        budget: i.value,
        color: i.color
      }))
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch budget data' });
  }
});

app.post('/budget', async (req, res) => {
  try {
    const { title, value, color } = req.body || {};
    const created = await BudgetItem.create({ title, value, color });
    res.status(201).json(created);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const details = Object.values(e.errors).map(er => er.message);
      return res.status(400).json({ error: 'Validation failed', details });
    }
    console.error(e);
    res.status(500).json({ error: 'Failed to create budget item' });
  }
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});