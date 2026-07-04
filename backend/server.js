const express = require('express');
const cors = require('cors');
require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const { globalLimiter } = require('./middleware/rateLimiter');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://digieonix.com'],
    methods: ['GET', 'POST']
  }
});

// Make io accessible to our router
app.set('io', io);

const path = require('path');

// Security Middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow images to load across origins

// Global Rate Limiting
app.use(globalLimiter);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://digieonix.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.get('/', (req, res) => {
  res.send('Digieonix API is running...');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/analytics', require('./routes/analytics'));

// Socket.io Live Users Logic
let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  io.emit('liveUsersCount', activeUsers);

  socket.on('disconnect', () => {
    activeUsers--;
    // ensure it doesn't go below 0 (though technically shouldn't happen)
    if (activeUsers < 0) activeUsers = 0;
    io.emit('liveUsersCount', activeUsers);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Digieonix Backend running on port ${PORT}`);
});
