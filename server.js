const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health‑check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

app.get('/ci-cd', (req, res) => {

  res.status(200).json({ status: 'ok', message: 'CI/CD is running' });
})