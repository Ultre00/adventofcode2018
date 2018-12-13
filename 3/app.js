const utils = require('../utils');

createField = (size) => {
    let field = new Array(size);
    for (let i = 0; i < size; i++) {
        field[i] = new Array(size);
    }
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            field[x][y] = 0;
        }
    }
    return field;
}

const parseData = (data) => {
    let result = [];
    data.forEach(row => {
        const start = row.indexOf("@");
        const end = row.indexOf(":");
        const id = Number(row.substring(1, start))
        const xy = row.substring(start + 2, end).split(',').map(m => Number(m));
        const size = row.substring(end + 2, row.length).split('x').map(m => Number(m));
        result.push({ id, x: xy[0], y: xy[1], width: size[0], height: size[1] })
    });
    return result;
}

const fillField = (field, data) => {
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let x = 0; x < row.width; x++) {
            for (let y = 0; y < row.height; y++) {
                field[x + row.x][y + row.y]++;
            }
        }
    }
}

const findNonOverlappingId = (field, data) => {
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        let nonOverlapping = true
        for (let x = 0; x < row.width; x++) {
            for (let y = 0; y < row.height; y++) {
                if (field[x + row.x][y + row.y] > 1)
                    nonOverlapping = false;
            }
        }
        if(nonOverlapping){
            console.log(row.id)
            break;
        }
    }
}

const run = async () => {
    const rawData = await utils.readFile('./input');
    const data = parseData(rawData);
    let field = createField(1000);
    fillField(field, data);
    findNonOverlappingId(field, data);
}
run();
