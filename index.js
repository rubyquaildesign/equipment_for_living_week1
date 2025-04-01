import express from 'express';
import {Server as SocketIO} from 'socket.io';

const app = express();
const server = app.listen(3000);
app.use(express.static('./public'));
const io = new SocketIO(server, {
  cors: {
    origin: true,
  },
  allowEIO3: true,
});
const state = [];
function handleConnection(socket) {
  socket.on('input', function (data) {
    state.push(data);
    socket.emit('state', state);
  });
}

io.sockets.on('connection', handleConnection);
