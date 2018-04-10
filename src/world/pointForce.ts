import { Particle } from "./particle";
import { difference, magnitude, normalized, product } from "../math/vector";
import { IArtist } from "../rendering/artist";

export class PointForce {
    private static RADIUS: number = 15;
    private static COLOR: number[] = [1, 0, 1];
    private static ATTRACTION_CONSTANT = 13;

    private position: number[];
    private attraction: number;

    public constructor(position: number[] = [0, 0], attraction: number = 0) {
        this.position = position;
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
        artist.fill(PointForce.COLOR[0], PointForce.COLOR[1], PointForce.COLOR[2]);
        artist.ellipse(this.position[0], this.position[1], PointForce.RADIUS);
    }
}