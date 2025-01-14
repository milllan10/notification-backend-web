const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// CORS configuration for your frontend URL
app.use(cors({
  origin: 'https://notification-web-opal.vercel.app',  // Replace with your frontend URL
  methods: ['GET', 'POST'],
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://notification-web-opal.vercel.app',  // Same frontend URL here
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendNotification', (data) => {
    io.emit('receiveNotification', data);  // Send notification to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Default to port 5000 or Vercel's provided port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
