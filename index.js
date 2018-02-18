const express = require('express');
// const socket = require('socket.io');
const app = express();
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use(express.static('public'));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('Socket connection made', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});