import express from 'express';
import cors from 'cors';
import http from 'http';
import usersRoute from './routes/users.js';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', usersRoute);

const server = http.createServer(app);
const io = new Server(server, {cors: { origin: '*' }}) ;

io.on('connection', socket => {
    console.log('ya');

    socket.on('disconnect', () => {
        console.log('disconected');
    });
});

server.listen(PORT, () => void console.log('runnning at', PORT));
