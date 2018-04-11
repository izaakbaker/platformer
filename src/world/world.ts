import { Particle } from "./particle";
import { IArtist } from "../rendering/artist";
import { PointForce } from "./pointForce";
import { Entity } from "./entity";

export class World {
    private particles: Particle[];
    private pointForces: PointForce[];

    private focusPoint: number[];
    private focusedEntity: Entity | null;

    public constructor() {
        this.particles = [];
        this.pointForces = [];
        this.focusedEntity = null;
    }

    public update(): void {
        const previousFocusedEntity = this.focusedEntity;
        this.focusedEntity = null;
        this.pointForces.forEach(pointForce => {
            if (pointForce.isHoveredOver(this.focusPoint)) {
                this.focusedEntity = pointForce;
            }
        });
        if (this.focusedEntity === null && previousFocusedEntity !== null) {
            previousFocusedEntity.onLoseFocus();
        }
        if (this.focusedEntity !== null && previousFocusedEntity === null) {
            this.focusedEntity.onFocus();
        }
        if (this.focusedEntity !== null && previousFocusedEntity !== null && this.focusedEntity.getId() !== previousFocusedEntity.getId()) {
            this.focusedEntity.onFocus();
            previousFocusedEntity.onLoseFocus();
        }
        this.particles.forEach(particle => {
            this.pointForces.forEach(pointForce => pointForce.actOn(particle));
            particle.move();
        });
    }

    public renderWith(artist: IArtist): void {
        artist.reset();
        artist.setFillColor(1, 1, 1);
        artist.rect(0, 0, 600, 600);
        this.particles.forEach(particle => particle.renderWith(artist));
        this.pointForces.forEach(pointForce => pointForce.renderWith(artist));
        if (this.focusedEntity !== null) {
            this.focusedEntity.renderFocusedWith(artist);
        }
    }

    public addParticle(particle: Particle) {
        this.particles.push(particle);
    }

    public addPointForce(pointForce: PointForce) {
        this.pointForces.push(pointForce);
    }

    public focusAt(point: number[]): void {
        this.focusPoint = point;
    }
}