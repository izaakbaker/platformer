import { Entity } from "./entity";
import uuid from "uuid";
import { Particle } from "./particle";
import { difference, squaredMagnitude, withMagnitude, magnitude, sum, product } from "../math/vector";
import { IArtist } from "../rendering/artist";

export class Scatterer extends Entity {
    private static EFFECT_RADIUS: number = 10;
    private static RENDER_INNER_RADIUS: number = 5;
    private static COLOR: number[] = [0.2, 0.2, 0.2];

    public constructor(initialPosition: number[] = [0, 0]) {
        super(`SCATTERER ${uuid.v4()}`, initialPosition);
    }

    public actOn(particle: Particle): void {
        const vectorToUs = difference(this.position, particle.getPosition());
        const squaredDistance = squaredMagnitude(vectorToUs);
        if (squaredDistance < Scatterer.EFFECT_RADIUS * Scatterer.EFFECT_RADIUS) {
            const randomAngle = Math.random() * 360;
            let randomDirection = [Math.cos(randomAngle), Math.sin(randomAngle)];
            let newPosition = sum(this.position, product(Scatterer.EFFECT_RADIUS, randomDirection));
            let newVelocity = withMagnitude(randomDirection, magnitude(particle.getVelocity()));
            particle.setPosition(newPosition);
            particle.setVelocity(newVelocity);
        }
    }

    public renderWith(artist: IArtist) {
        artist.reset();
        artist.setFillColor(Scatterer.COLOR[0], Scatterer.COLOR[1], Scatterer.COLOR[2]);
        artist.star(this.position[0], this.position[1], 8, Scatterer.EFFECT_RADIUS, Scatterer.RENDER_INNER_RADIUS);
    }
}