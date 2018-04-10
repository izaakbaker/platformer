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

export function magnitude(v: number[]): number {
    return Math.sqrt(squaredMagnitude(v));
}

export function limitMagnitude(v: number[], m: number) {
    if (squaredMagnitude(v) > m * m) {
        return withMagnitude(v, m);
    }
    return [...v];
}

export function normalized(v: number[]): number[] {
    return product(1 / magnitude(v), v);
}

export function withMagnitude(v: number[], m: number) {
    return product(m, normalized(v));
}
   