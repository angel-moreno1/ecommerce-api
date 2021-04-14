import express from 'express';
import cors from 'cors';
import http from 'http';
import usersRoute from './routes/users.js';

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', usersRoute);

server.listen(PORT, () => void console.log('runnning at', PORT));
