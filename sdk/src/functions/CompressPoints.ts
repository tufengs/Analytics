const compressPoints = (points: { x: number, y: number }[]) => {
    const compressed: { x: number, y: number, v?: number }[] = [];

    const grid: number = 15;

    for (let i = 0; i < points.length; i++) {
        let { x, y } = points[i];

        const adjustedPoint = {
            x: Math.round(x / grid) * grid,
            y: Math.round(y / grid) * grid,
        };

        const existingPoint = compressed.find(p =>
            p.x === adjustedPoint.x &&
            p.y === adjustedPoint.y
        );

        if (existingPoint) {
            if (!existingPoint.v) {
                existingPoint.v = 1;
            }
            existingPoint.v++;
        } else {
            compressed.push({ ...adjustedPoint });
        }
    }

    return compressed;
}

export { compressPoints };