import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const io = new Server(server, {cors: { origin: '*' }, serveClient: false}) ;

io.on('connection', socket => {
    console.log('joined', socket);
    socket.on('disconnect', () => {
        console.log('disconected');
    });
});

server.listen(PORT, () => void console.log('runnning at', PORT));
