export function sum(v1: number[], v2: number[]): number[] {
    return v1.map((component, index) => component + v2[index]);
}

export function product(a: number, v: number[]): number[] {
    return v.map(component => component * a);
}

export function difference(v1: number[], v2: number[]): number[] {
    return v1.map((component, index) => component - v2[index]);
}

export function negative(v: number[]): number[] {
    return v.map(component => -component);
}

export function squaredMagnitude(v: number[]): number {
    return v.map(component => component * component).reduce((e1, e2) => e1 + e2);
}

export function normalized(v: number[]): number[] {
    const magnitude = Math.sqrt(squaredMagnitude(v));
    return product(1 / magnitude, v);
}

export function withMagnitude(v: number[], m: number) {
    return product(m, normalized(v));
}
   