import express from 'express';
import 'express-async-errors'; // handle async errors without try-catch
import router from './routes';
import dotenv from 'dotenv';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

export const app = express();

const corsOptions = {
  origin: ['http://localhost:3002', 'http://localhost:5173', 'http://d3uky4au1tedcv.cloudfront.net']
};

const server = http.createServer(app);

// socket connection
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
});
io.on('connection', (socket) => {
  console.log('a user connected on ', socket.id);
  socket.on('updateTask', () => { // on : listen event emit from client
    console.log('BE: updateTask listen');

    io.emit('updateBoard');  // emit : send this event to client and then client update board in all browser window
    console.log('BE: updateBoard emit');
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// middleware
app.use(cors(corsOptions)); // allow api access to valid FE URL only

app.use(express.json()); // parse JSON
app.use(requestLogger); // custom request logger

//health route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is up and running Healthy' });
})

// routes
app.use('/api', router);

// no route found
app.use('/', (req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log('server running on port', PORT);
// });

server.listen(PORT, () => {
  console.log('server running on port', PORT);
});
