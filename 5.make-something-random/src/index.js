const something = document.getElementById("something");
const text = something.textContent;

let charIndex = 0;

setTimeout(() => {
    setInterval(() => {
        // Trolling
        let rand = Math.floor(++charIndex / 9) % 2 === 0 ? (() => { let r; do { r = String.fromCharCode(Math.floor(Math.random() * 26) + 97) } while (r === something.textContent[charIndex % something.textContent.length]); return r})() : text[charIndex % text.length]
        something.textContent = document.title = something.textContent.substring(0, charIndex % something.textContent.length) + rand + something.textContent.substring(charIndex % something.textContent.length + 1);
    }, 50);
}, 1000);