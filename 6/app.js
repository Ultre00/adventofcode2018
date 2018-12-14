const utils = require('../utils');

const parseData = input => {
    let data = { max: { x: 0, y: 0 }, coords: [] }

    for (let id = 0; id < input.length; id++) {
        const xy = input[id].split(', ');
        const x = Number(xy[0]);
        const y = Number(xy[1]);
        data.coords.push({ x, y, id });
        data.max.x = x > data.max.x ? x : data.max.x;
        data.max.y = y > data.max.y ? y : data.max.y;
    }

    return data;
}

const analyseData = data => {
    let result = {};
    let infinityIds = [];
    for (let x = 0; x <= data.max.x + 1; x++) {
        for (let y = 0; y <= data.max.y + 1; y++) {
            const closest = getClosestPoint({ x, y }, data.coords);
            if (closest) {
                result[closest.id] = result[closest.id] ? result[closest.id] + 1 : 1;
                if ((x === 0 || x === data.max.x || y === 0 || y === data.max.y) && !infinityIds.includes(closest.id)) {
                    infinityIds.push(closest.id);
                }
            }
        }
    }
    console.log(Math.max(...Object.entries(result).filter(m => !infinityIds.includes(Number(m[0]))).map(m => m[1])));
    return result;
}

const getClosestPoint = (p, points) => {
    let closest = Infinity;
    let closestPoint;
    for (let i = 0; i < points.length; i++) {
        const distance = getDistance(p, points[i])
        if (distance < closest) {
            closest = distance;
            closestPoint = points[i]
        } else if (distance === closest) {
            closestPoint = null;
        }
    }
    return closestPoint;
}

const getDistance = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const run = async () => {
    let input = await utils.readFile('./input');
    const parsed = parseData(input);
    analyseData(parsed);
}
run();
