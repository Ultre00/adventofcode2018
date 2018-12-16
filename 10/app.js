const utils = require('../utils');
const fs = require('fs');

const parseData = input => {
    let result = []
    input.forEach(row => {
        const match = row.trim().match(/<(.*?)>/g);
        const position = match[0].substring(1, match[0].length - 1).split(',').map(m => Number(m));
        const velocity = match[1].substring(1, match[1].length - 1).split(',').map(m => Number(m));
        result.push({ position, velocity });
    });
    return result;
}

const normalizeData = data => {
    const leftOffset = Math.min(...data.map(m => m.position[0]));
    const topOffset = Math.min(...data.map(m => m.position[1]));
    const normalized = data.map(m => ({ ...m, position: [m.position[0] - leftOffset, m.position[1] - topOffset] }))
    return normalized;
}

const processData = data => {
    let prevFieldSize = getFieldSize(data);
    let prevData = data;
    let updatedData = updatePositions(prevData);
    let updatedFieldSize = getFieldSize(updatedData);
    while (updatedFieldSize < prevFieldSize) {
        prevData = updatedData;
        prevFieldSize = updatedFieldSize;
        updatedData = updatePositions(prevData);
        updatedFieldSize = getFieldSize(updatedData);
    }
    drawField(normalizeData(prevData));
}

const drawField = data => {
    const positions = data.map(m => m.position);
    const horizontal = Math.max(...positions.map(m => m[0]));
    const vertical = Math.max(...positions.map(m => m[1]));

    let result = ""
    for (let y = 0; y <= vertical; y++) {
        for (let x = 0; x <= horizontal; x++) {
            result += positions.some(m => m[0] === x && m[1] === y) ? '#' : '.';
        }
        result += '\n';
    }

    fs.writeFile('output', result, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

const getFieldSize = data => {
    const positions = data.map(m => m.position);   
    const horizontal = Math.max(...positions.map(m => m[0])) - Math.min(...positions.map(m => m[0]));
    const vertical = Math.max(...positions.map(m => m[1])) - Math.min(...positions.map(m => m[1]));
    return horizontal * vertical;
}

const updatePositions = data => {
    return data.map(m => ({ ...m, position: [m.position[0] + m.velocity[0], m.position[1] + m.velocity[1]] }))
}

const run = async () => {
    let input = await utils.readFile('./input');
    const data = parseData(input);
    const normalized = normalizeData(data);    
    processData(normalized);
}
run();
