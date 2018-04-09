import { ipcRenderer } from "electron";

const newGameButton: HTMLButtonElement = document.getElementById("new-game") as HTMLButtonElement;
newGameButton.addEventListener("click", () => {
    ipcRenderer.send("push-screen", "game");
});

const quitButton: HTMLButtonElement = document.getElementById("quit") as HTMLButtonElement;
quitButton.addEventListener("click", () => {
    ipcRenderer.send("quit");
});
