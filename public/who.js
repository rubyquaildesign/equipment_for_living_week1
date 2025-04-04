const span = document.getElementById('who');
const originalText = span.textContent;

const otherText = [
    "Whose voice can my rage embolden?", "Whose grief can my tears transform?",
    "Whose guilt can my anxieties assuage?",
    "Whose outlook can my joy brighten?",
    "Whose curiosity can my wonder pique?",
    "Whose wilderness can my highs awaken?"
];

let last_v = -1;

span.addEventListener('mousemove', (e) => {
        let v = Math.floor(e.offsetX / 20.0);
    if (v == last_v) {
        return;
    }
    last_v = v;
    let offset = Math.floor(Math.random() * otherText.length);
    let i = (v + offset) % otherText.length;
    span.textContent = otherText[i];
});

span.addEventListener('mouseout', () => { span.textContent = originalText; });
