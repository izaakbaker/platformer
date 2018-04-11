import { ipcRenderer } from "electron";
import { IArtist } from "../rendering/artist";
import { CanvasArtist } from "../rendering/canvasArtist";
import { World } from "../world/world";
import { Particle } from "../world/particle";
import { PointForce } from "../world/pointForce";
import { EntityType } from "../world/entity";

const canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
const drawMenuRadios: HTMLCollectionOf<Element> = document.getElementsByClassName("draw-menu-radio");
const context: CanvasRenderingContext2D = canvas.getContext("2d");

const artist: IArtist = new CanvasArtist(context);
const world = new World();

let drawType: EntityType = "PARTICLE";
let mouseDown: boolean = false;

setInterval(() => {
    world.update();
    world.renderWith(artist);
}, 15);

canvas.addEventListener("click", (event: MouseEvent) => {
    world.ifFocusedEntity(entity => entity.onClick(event));
});

canvas.addEventListener("mousedown", (event: MouseEvent) => {
    mouseDown = true;
});

canvas.addEventListener("mouseup", (event: MouseEvent) => {
    mouseDown = false;
    world.ifFocusedEntity(entity => entity.onMouseUp(event))
});

canvas.addEventListener("mousemove", (event: MouseEvent) => {
    if (mouseDown) {
        world.ifFocusedEntity(entity => entity.onDrag(event));
    } else {
        world.focusAt([event.offsetX, event.offsetY]);
    }
})

for (let i = 0; i < drawMenuRadios.length; i++) {
    drawMenuRadios[i].addEventListener("click", (event: MouseEvent) => {
        world.getBackground().setGenerateType((event.target as HTMLInputElement).value as EntityType);
    });
}

