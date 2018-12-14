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
    let count = 0;
    for (let x = 0; x <= data.max.x + 1; x++) {
        for (let y = 0; y <= data.max.y + 1; y++) {
            const distance = data.coords.reduce((result, cur) => result + getDistance({ x, y }, cur), 0)
            if (distance < 10000) {
                count++;
            }
        }
    }
    console.log(count);
}

const getDistance = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const run = async () => {
    let input = await utils.readFile('./input');
    const parsed = parseData(input);
    analyseData(parsed);
}
run();
