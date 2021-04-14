import express from 'express';
import cors from 'cors';
import usersRoute from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', usersRoute);

export default app;