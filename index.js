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
let state = [];
function handleConnection(socket) {
  socket.emit('state',state)
  socket.on('input', function (data) {
    console.log(data);
    state = state.filter(s => s.id !== data.id)
    state.push(data);
    socket.broadcast.emit('state', state);
    socket.emit('state', state);
  });
  socket.on('upgrade', (data) => {
    const id = data.id;
    const d = state.find((d) => d.id === id);
    if (d) {
      d.grown = true;
      socket.broadcast.emit('state',state)
      socket.emit('state',state)
    }
  })
}

io.sockets.on('connection', handleConnection);
