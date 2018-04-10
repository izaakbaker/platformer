import { Particle } from "./particle";
import { difference, magnitude, normalized, product, squaredMagnitude } from "../math/vector";
import { IArtist } from "../rendering/artist";
import { Entity } from "./entity";

export class PointForce extends Entity {
    private static RADIUS: number = 15;
    private static COLOR: number[] = [1, 0, 1];
    private static ATTRACTION_CONSTANT = 13;

    private attraction: number;

    public constructor(initialPosition: number[] = [0, 0], attraction: number = 0) {
        super(initialPosition);
        this.attraction = attraction;
    }

    public actOn(particle: Particle): void {
        let vectorToUs = difference(this.position, particle.getPosition());
        const invSqrtDistance: number = 1 / Math.sqrt(magnitude(vectorToUs));
        vectorToUs = normalized(vectorToUs);
        vectorToUs = product(this.attraction * PointForce.ATTRACTION_CONSTANT * invSqrtDistance, vectorToUs);
        particle.accelerate(vectorToUs);
    }

    public renderWith(artist: IArtist) {
        artist.reset();
        artist.setFillColor(PointForce.COLOR[0], PointForce.COLOR[1], PointForce.COLOR[2]);
        artist.ellipse(this.position[0], this.position[1], PointForce.RADIUS);
    }

    public renderFocusedWith(artist: IArtist) {
        artist.reset();
        artist.setStroke(true);
        artist.setFill(false);
        artist.setStrokeColor(0.5, 0, 0.5);
        artist.ellipse(this.position[0], this.position[1], PointForce.RADIUS + 2);
    }

    public isHoveredOver(pointer: number[]) {
        const pointerToCenter = difference(this.position, pointer);
        const distance = squaredMagnitude(pointerToCenter);
        return distance < PointForce.RADIUS * PointForce.RADIUS;
    }
}