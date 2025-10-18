const express = require('express');
const path = require('path');

const app = express();
const port = 3001; 

app.get('/budget', (req, res, next) => {
  const filePath = path.join(__dirname, 'budget.json');
  res.sendFile(filePath, (err) => {
    if (err) next(err);
  });
});

app.use((err, req, res, next) => {
  console.error('[server] ERROR:', err);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`API on http://localhost:${port}`);
});
