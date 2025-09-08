import express from 'express';
import 'express-async-errors'; // handle async errors without try-catch
import router from './routes';
import dotenv from 'dotenv';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';

dotenv.config();

export const app = express();

const corsOptions = {
  origin: ['http://localhost:3002', 'http://localhost:5173', 'http://d1kdjdqjl0q1bl.cloudfront.net']
};

// middleware
app.use(cors(corsOptions)); // allow api access to valid FE URL only

app.use(express.json()); // parse JSON
app.use(requestLogger); // custom request logger

//health route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
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

app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
