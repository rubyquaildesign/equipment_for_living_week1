// ----------------
// GLOBAL VARIABLES
// ----------------
import { Eye } from './eye.js';
import { manager } from './io.js';
export let sauron_canvas = document.getElementById('sauron');
export let sauron_ctx = sauron_canvas.getContext('2d');
let time = 0;
export let lone_eye = new Eye(
    sauron_canvas.width / 2,
    sauron_canvas.height / 2,
    0.1,
    Math.min(sauron_canvas.width, sauron_canvas.height) * 0.1,
    'grey'
);
const mg = await manager;
let state = [];
const youngTree = '🌱';
const grownTree = '🌳';
const cb = (st) => {
    console.log(st);

    state = st;
};
mg.addCallback(cb);
sauron_canvas.addEventListener('mousemove', (e) => {
    lone_eye.UpdateMouse(e.offsetX, e.offsetY);
});

sauron_canvas.addEventListener('mouseout', (e) => {
    lone_eye.UpdateMouse(-1, -1);
});

sauron_canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    for (let item of state) {
        if (item.id === mg.id) continue;
        if (
            Math.sqrt(
                (item.x - x) ** 2 + (item.y - y) ** 2
            ) > 16
        ) continue;
        if (item.grown) return;
        mg.grow(item.id)
        return;
    }
    mg.add(x, y);
});

function Start() {
    lone_eye.Draw(sauron_ctx);
    time = 0;
    Update();
}

function Update() {
    sauron_ctx.clearRect(0, 0, sauron_canvas.width, sauron_canvas.height);
    lone_eye.Draw(sauron_ctx);
    sauron_ctx.font = '16px serif';
    sauron_ctx.textAlign = 'center';

    for (let item of state) {
        const x = item.x;
        const y = item.y;
        const grown = item.grown;
        if (grown) {
            sauron_ctx.fillText(grownTree, x, y);
        } else {
            sauron_ctx.fillText(youngTree, x, y);
        }
    }
    requestAnimationFrame(Update);
}

Start();
