import { Particle } from "./particle";
import { IArtist } from "../rendering/artist";
import { PointForce } from "./pointForce";
import { Entity } from "./entity";
import { Background } from "./background";
import { ipcRenderer } from "electron";
import { NullEntity } from "./nullEntity";

export class World {
    private background: Background;
    private particles: Particle[];
    private pointForces: PointForce[];
    private nonParticleEntities: Entity[];

    private focusPoint: number[];
    private focusedEntity: Entity;

    public constructor() {
        this.background = new Background(this);
        this.particles = [];
        this.pointForces = [];
        this.focusPoint = [0, 0];
        this.nonParticleEntities = [new NullEntity(), this.background];
        this.focusedEntity = this.nonParticleEntities[0];
    }

    public update(): void {
        const previousFocusedEntity = this.focusedEntity;
        this.nonParticleEntities.forEach(entity => {
            if (entity.isHoveredOver(this.focusPoint)) {
                if (this.focusedEntity.getPriority() < entity.getPriority() || this.focusedEntity.willRelinquishFocus()) {
                    this.focusedEntity = entity;
                }
            }
        });
        if (this.focusedEntity.getId() !== previousFocusedEntity.getId()) {
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
        artist.setFillColor(0.9, 0.9, 0.9);
        artist.rect(0, 0, 600, 600);
        if (this.focusedEntity !== null) {
            this.focusedEntity.renderFocusedWith(artist);
        }
        this.particles.forEach(particle => particle.renderWith(artist));
        this.pointForces.forEach(pointForce => pointForce.renderWith(artist));
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