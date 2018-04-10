import { ipcRenderer } from "electron";
import { IArtist } from "../rendering/artist";
import { CanvasArtist } from "../rendering/canvasArtist";
import { World } from "../world/world";
import { Particle } from "../world/particle";
import { PointForce } from "../world/pointForce";

type EntityType = "PARTICLE" | "POINT_FORCE";

const canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
const drawMenuRadios: HTMLCollectionOf<Element> = document.getElementsByClassName("draw-menu-radio");
const context: CanvasRenderingContext2D = canvas.getContext("2d");

const artist: IArtist = new CanvasArtist(context);
const world = new World();

let drawType: EntityType = "PARTICLE";

setInterval(() => {
    world.update();
    world.renderWith(artist);
}, 15);

canvas.addEventListener("click", (event: MouseEvent) => {
    switch (drawType) {
        case "PARTICLE":
            const newParticle: Particle = new Particle([event.offsetX, event.offsetY]);
            world.addParticle(newParticle);
            break;
        case "POINT_FORCE":
            const newPointForce: PointForce = new PointForce([event.offsetX, event.offsetY], 0.5);
            world.addPointForce(newPointForce);
            break;
    }
});

canvas.addEventListener("mousemove", (event: MouseEvent) => {
    world.focusAt([event.offsetX, event.offsetY]);
})

for (let i = 0; i < drawMenuRadios.length; i++) {
    drawMenuRadios[i].addEventListener("click", (event: MouseEvent) => {
        drawType = (event.target as HTMLInputElement).value as EntityType;
    });
}

