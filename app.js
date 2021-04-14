import express from 'express';
import cors from 'cors';
import usersRoute from './routes/users.js';

import unknownEndpoint from './middlewares/unknownEndpoint.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', usersRoute);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;