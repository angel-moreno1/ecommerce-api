import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import { Server } from 'socket.io';

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
dotenv.config();

const io = new Server(server, {cors: { origin: '*' }, serveClient: false});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}) 
    .then(() => void console.log('connected to db'))
    .catch(() => void console.log('was an error'));

io.on('connection', socket => {
    console.log('joined', socket);
    socket.on('disconnect', () => {
        console.log('disconected');
    });
});

server.listen(PORT, () => void console.log('runnning at', PORT));
