const compressPoints = (points: { x: number, y: number }[]) => {
    const compressed: number[][] = [];

    const grid: number = 15;

    for (let i = 0; i < points.length; i++) {
        let { x, y } = points[i];

        const adjustedPoint = [
            Math.round(x / grid) * grid,
            Math.round(y / grid) * grid,
            1,
        ];

        const existingPoint = compressed.find(p =>
            p[0] === adjustedPoint[0] &&
            p[1] === adjustedPoint[1]
        );

        if (existingPoint) {
            existingPoint[2]++;
        } else {
            compressed.push(adjustedPoint);
        }
    }

    return compressed;
}

export { compressPoints };