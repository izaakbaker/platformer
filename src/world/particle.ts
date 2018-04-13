import { IArtist } from "../rendering/artist";
import { sum, limitMagnitude } from "../math/vector";
import { Entity } from "./entity";
import uuid from "uuid";

export class Particle extends Entity {
    private static MAX_SPEED: number = 10;
    private static RADIUS: number = 3;
    private static COLOR: number[] = [1, 0.5, 0];

    private velocity: number[];
    private acceleration: number[];
    
    public constructor(initialPosition: number[] = [0, 0], initialVelocity: number[] = [0, 0]) {
        super(`PARTICLE ${uuid.v4()}`, initialPosition);
        this.velocity = initialVelocity;
        this.acceleration = [0, 0];
    }

    public accelerate(acceleration: number[]): void {
        for (let i = 0; i < this.acceleration.length; i++) {
            this.acceleration[i] += acceleration[i];
        }
    }

    public clearAcceleration(): void {
        for (let i = 0; i < this.acceleration.length; i++) {
            this.acceleration[i] = 0;
        }
    }

    public move(): void {
        this.velocity = sum(this.velocity, this.acceleration);
        this.velocity = limitMagnitude(this.velocity, Particle.MAX_SPEED);
        this.position = sum(this.position, this.velocity);
        this.clearAcceleration();
    }

    public renderWith(artist: IArtist): void {
        artist.reset();
        artist.setFillColor(Particle.COLOR[0], Particle.COLOR[1], Particle.COLOR[2]);
        artist.ellipse(this.position[0], this.position[1], Particle.RADIUS);
    }

    public getVelocity(): number[] {
        return this.velocity;
    }

    public setVelocity(velocity: number[]): void {
        this.velocity = velocity;
    }
}