import { Particle } from "./particle";
import { difference, magnitude, normalized, product, squaredMagnitude, sum, negative, angleBetween } from "../math/vector";
import { IArtist } from "../rendering/artist";
import { Entity } from "./entity";
import uuid from "uuid";
import { ipcRenderer } from "electron";

export class PointForce extends Entity {
    private static NORMAL_RADIUS: number = 10;
    private static ROTATION_DIAL_RADIUS: number = 30;
    private static ATTRACTION_DIAL_RADIUS: number = 50;
    private static COLOR: number[] = [0.2, 0.2, 0.2];
    private static ATTRACTION_CONSTANT = 13;
    private static ROTATION_CONSTANT = 4;

    private attraction: number;
    private rotation: number;
    private radius: number;
    private moving: boolean;
    private isFocused: boolean;

    public constructor(initialPosition: number[] = [0, 0], attraction: number = 0, rotation: number = 0) {
        super(`POINT FORCE ${uuid.v4()}`, initialPosition);
        this.attraction = attraction;
        this.rotation = rotation;
        this.radius = PointForce.NORMAL_RADIUS;
        this.moving = false;
        this.isFocused = false;
    }

    public actOn(particle: Particle): void {
        let vectorToUs = difference(this.position, particle.getPosition());
        const invSqrtDistance: number = 1 / Math.sqrt(magnitude(vectorToUs));
        vectorToUs = normalized(vectorToUs);
        let perpendicular = [vectorToUs[1], -vectorToUs[0]];
        vectorToUs = product(this.attraction * PointForce.ATTRACTION_CONSTANT * invSqrtDistance, vectorToUs);
        perpendicular = product(this.rotation * PointForce.ROTATION_CONSTANT * invSqrtDistance, perpendicular);
        particle.accelerate(sum(vectorToUs, perpendicular));
    }

    public onFocus(): void {
        this.radius = PointForce.ATTRACTION_DIAL_RADIUS;
        this.isFocused = true;
    }

    public onLoseFocus(): void {
        this.radius = PointForce.NORMAL_RADIUS;
        this.isFocused = false;
    }

    public renderWith(artist: IArtist): void {
        artist.reset();
        artist.setFillColor(PointForce.COLOR[0], PointForce.COLOR[1], PointForce.COLOR[2]);
        artist.ellipse(this.position[0], this.position[1], PointForce.NORMAL_RADIUS);
    }

    public renderFocusedWith(artist: IArtist): void {
        artist.reset();
        artist.setFill(true);
        artist.setFillColor(0.6, 0.6, 0.6);
        artist.pieSlice(this.position[0], this.position[1], PointForce.ATTRACTION_DIAL_RADIUS, 0, this.attraction * Math.PI);
        artist.setFillColor(0.4, 0.4, 0.4);
        artist.pieSlice(this.position[0], this.position[1], PointForce.ROTATION_DIAL_RADIUS, 0, this.rotation * Math.PI);

        artist.setFill(false);
        artist.setStroke(true);
        artist.setStrokeColor(1, 1, 1);
        artist.ellipse(this.position[0], this.position[1], PointForce.ATTRACTION_DIAL_RADIUS);
        artist.ellipse(this.position[0], this.position[1], PointForce.ROTATION_DIAL_RADIUS);
    }

    public isHoveredOver(pointer: number[]): boolean {
        const pointerToCenter = difference(this.position, pointer);
        const distance = squaredMagnitude(pointerToCenter);
        return distance < this.radius * this.radius;
    }

    public onDrag(event: MouseEvent): void {
        const pointer = [event.offsetX, event.offsetY];
        const pointerToCenter = difference(this.position, pointer);
        const squaredDistance = squaredMagnitude(pointerToCenter);
        let shouldMove: boolean = this.moving || squaredDistance < PointForce.NORMAL_RADIUS * PointForce.NORMAL_RADIUS;

        if (shouldMove) {
            this.moving = true;
            this.position = pointer;
        } else {
            const vertical = [0, -1];
            const centerToPointer = negative(pointerToCenter);
            const angle = angleBetween(vertical, centerToPointer) / Math.PI;
            if (pointer[0] > this.position[0]) {
                if (squaredDistance > PointForce.ROTATION_DIAL_RADIUS * PointForce.ROTATION_DIAL_RADIUS) {
                    this.attraction = angle;
                } else {
                    this.rotation = angle;
                }
            } else {
                if (squaredDistance > PointForce.ROTATION_DIAL_RADIUS * PointForce.ROTATION_DIAL_RADIUS) {
                    this.attraction = -angle;
                } else {
                    this.rotation = -angle;
                }
            }
        }
    }

    public onMouseUp(event: MouseEvent): void {
        this.moving = false;
    }

    public willRelinquishFocus(): boolean {
        return !this.moving;
    }

    public getPriority(): number {
        return 20;
    }
}