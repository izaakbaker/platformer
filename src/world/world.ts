import { Particle } from "./particle";
import { IArtist } from "../rendering/artist";
import { PointForce } from "./pointForce";
import { Entity } from "./entity";
import { Background } from "./background";

export class World {
    private background: Background;
    private particles: Particle[];
    private pointForces: PointForce[];
    private nonParticleEntities: Entity[];

    private focusPoint: number[];
    private focusedEntity: Entity | null;

    public constructor() {
        this.background = new Background(this);
        this.particles = [];
        this.pointForces = [];
        this.focusPoint = [0, 0];
        this.nonParticleEntities = [this.background];
        this.focusedEntity = null;
    }

    public update(): void {
        const previousFocusedEntity = this.focusedEntity;
        this.focusedEntity = null;
        this.nonParticleEntities.forEach(entity => {
            if (entity.isHoveredOver(this.focusPoint)) {
                if (this.focusedEntity == null || this.focusedEntity.getPriority() < entity.getPriority()) {
                    this.focusedEntity = entity;
                }
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
        console.log("Focused entity is " + this.focusedEntity ? this.focusedEntity.getId() : "null");
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
        this.nonParticleEntities.push(pointForce);
    }

    public getBackground(): Background {
        return this.background;
    }

    public focusAt(point: number[]): void {
        this.focusPoint = point;
    }

    public ifFocusedEntity(callback: (entity: Entity) => void): void {
        if (this.focusedEntity !== null) {
            callback(this.focusedEntity);
        }
    }
}