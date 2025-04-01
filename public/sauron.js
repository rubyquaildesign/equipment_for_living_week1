// ----------------
// GLOBAL VARIABLES
// ----------------
import { Eye } from "./eye.js";
export let sauron_canvas = document.getElementById("sauron");
export let sauron_ctx = sauron_canvas.getContext("2d");
let time = 0
export let lone_eye = new Eye(sauron_canvas.width / 2, sauron_canvas.height / 2, 0.1,
                   Math.min(sauron_canvas.width, sauron_canvas.height) * 0.1, 'grey');

sauron_canvas.addEventListener(
    'mousemove', (e) => { lone_eye.UpdateMouse(e.offsetX, e.offsetY); });

sauron_canvas.addEventListener(
    'mouseout', (e) => { lone_eye.UpdateMouse(-1, -1); });

function Start() {
    lone_eye.Draw(sauron_ctx);
    time = 0;
    setInterval(Update, 30);
}

function Update() {
    sauron_ctx.clearRect(0, 0, sauron_canvas.width, sauron_canvas.height);
    lone_eye.Draw(sauron_ctx);
}

Start();