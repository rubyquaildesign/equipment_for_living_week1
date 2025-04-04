
/// <reference path="./test.d.ts"/>

let id = localStorage.getItem('id');
if (!id) {
  id = crypto.randomUUID();
  localStorage.setItem('id', id);
}
export const manager = new Promise(async (resolve, reject) => {
  const socket = io();
  /** @type {Array<(...args:any[]) => unknown>} */
  let callbacks = []
  socket.on('state', (data) => {
    console.log(data);

    for (let callback of callbacks) {
      callback(data)
    }
  })
  const addCallback = (cb) => {
    callbacks.push(cb)
  }
  const removeCallback = (cb) => {
    callbacks = callbacks.filter(c => c === cb)
  }
  const add = (x, y) => {
    socket.emit('input',{ x, y, id: id,grown:false })
  }
  const grow = (uuid) => {
    socket.emit('upgrade', {id:uuid})
  }
  socket.on('connect', () => {
    resolve({
      id,
      addCallback,
      removeCallback,
      add,
      grow
    });
  })
})