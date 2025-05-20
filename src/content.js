textbox = document.activeElement;
mashing = true;
caps = false;

shadowContainer = document.createElement("div");
shadow = document.body.appendChild(shadowContainer).attachShadow({ mode: "open" });
shadow.innerHTML = '<div style="border-radius: 10px; background-color: white; color: black; border: 2px solid black; position: fixed; bottom: 2%; left: calc(24% - 1.5825px); margin: 0; padding: 1%; width: 50%; text-align: center; z-index: 10000; font-family: sans-serif; box-shadow: 0px 5px 5px gray;">' + chrome.i18n.getMessage("statusOverlay") + '</div>'

mashLoop = setInterval(() => {
    if (mashing) {
        for (let i = 0; i < Math.round(Math.random() * 4) + 3; i++) {
            let charType = Math.round(Math.random() * 10);
            if (Math.random() <= 0.05) {
                if (caps) {
                    caps = false;
                } else {
                    caps = true;
                }
            }
            if (charType <= 2) {
                character = " ";
            } else if (charType <= 7) {
                if (caps) {
                    character = String.fromCharCode(Math.round(Math.random() * 25) + 65);
                } else {
                    character = String.fromCharCode(Math.round(Math.random() * 25) + 97);
                }
            } else if (charType == 8) {
                if (caps) {
                    character = String.fromCharCode(Math.round(Math.random() * 25) + 97);
                } else {
                    character = String.fromCharCode(Math.round(Math.random() * 25) + 65);
                }
            } else if (charType == 9) {
                character = String.fromCharCode(Math.round(Math.random() * 9) + 48);
            } else if (charType == 10) {
                if (Math.random() <= 0.7) {
                    character = ["`", "-", "=", "[", "]", "\\", ";", ";", ";", "'", ",", ",", ",", ".", ".", ".", "/"][Math.round(Math.random() * 16)];
                } else {
                    character = '~!@#$%^&*()_+{}|:"<>?'[Math.round(Math.random() * 20)];
                }
            }
            if (textbox.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                textbox.value += character;
            } else {
                textbox.innerHTML += character;
            }
        }
    }
    else clearInterval(mashLoop);
}, 150);

document.addEventListener("mousedown", () => { mashing = false; shadowContainer.remove() });
document.addEventListener("keydown", () => { mashing = false; shadowContainer.remove() });