const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 80;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for container information
app.get('/api/info', (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
    memory: {
      total: `${Math.round(os.totalmem() / (1024 * 1024))} MB`,
      free: `${Math.round(os.freemem() / (1024 * 1024))} MB`
    },
    cpus: os.cpus().length,
    network: Object.keys(os.networkInterfaces())
  });
});

// Health check endpoint for ALB
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
