import { Eye } from '/eye.js'
import { sauron_canvas } from '/sauron.js'
// ----------------
// GLOBAL VARIABLES
// ----------------
const NUM_EYES = 20;

var canvas = document.getElementById("cherubim");
var ctx = canvas.getContext("2d");
var eyes = [];
let time = 0;
canvas.addEventListener('mousemove', (e) => {
    for (let i = 0; i < NUM_EYES; i++) {
        eyes[i].UpdateMouse(e.offsetX, e.offsetY);
    }
});

canvas.addEventListener('mouseout', (e) => {
    for (let i = 0; i < NUM_EYES; i++) {
        eyes[i].UpdateMouse(-1, -1);
    }
});

function GetRandomColor() {
    var color = "#"
    for (var i = 0; i < 3; i++) {
        var tmp = "00" + Math.floor(Math.random() * 200 + 56).toString(16);
        color += tmp.substr(-2);
    }
    return color;
}

function Start() {
    for (let i = 0; i < NUM_EYES; i++) {
        eyes.push(new Eye(Math.random() * sauron_canvas.width,
            Math.random() * sauron_canvas.height,
            Math.random() * 0.1 + 0.11,
            Math.min(sauron_canvas.width, sauron_canvas.height) *
            (0.04 + Math.random() * 0.04),
            GetRandomColor()));
    }

    for (let i = 0; i < NUM_EYES; i++) {
        eyes[i].Draw(ctx);
    }

    time = 0;
    setInterval(Update, 30);
}

function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < NUM_EYES; i++) {
        eyes[i].Draw(ctx);
    }
}

Start();
