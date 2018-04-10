import { Particle } from "./particle";
import { IArtist } from "../rendering/artist";
import { PointForce } from "./pointForce";

export class World {
    private particles: Particle[];
    private pointForces: PointForce[];

    public constructor() {
        this.particles = [];
        this.pointForces = [];
    }

    public update(): void {
        this.particles.forEach(particle => {
            this.pointForces.forEach(pointForce => pointForce.actOn(particle));
            particle.move();
        })
    }

    public renderWith(artist: IArtist): void {
        artist.fill(1, 1, 1);
        artist.rect(0, 0, 600, 600);
        this.particles.forEach(particle => particle.renderWith(artist));
        this.pointForces.forEach(pointForce => pointForce.renderWith(artist));
    }

    public addParticle(particle: Particle) {
        this.particles.push(particle);
    }

    public addPointForce(pointForce: PointForce) {
        this.pointForces.push(pointForce);
    }
}