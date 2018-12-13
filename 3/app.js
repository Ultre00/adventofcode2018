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

let field = createField(1000);

const run = async () => {
    const data = await utils.readFile('./input');
    data.forEach(row => {
        const start = row.indexOf("@");
        const end = row.indexOf(":");
        const xy = row.substring(start + 2, end).split(',').map(m => Number(m));
        const size = row.substring(end + 2, row.length).split('x').map(m => Number(m));
        for (let x = 0; x < size[0]; x++) {
            for (let y = 0; y < size[1]; y++) {
                field[x + xy[0]][y + xy[1]]++;
            }
        }
    });
    console.log(field.reduce((result, cur) => result + cur.reduce((result2, cur2) => result2 + (cur2 >= 2 ? 1 : 0), 0), 0));

    const fs = require('fs');
    fs.writeFile("./output", field.reduce((result, cur) => result + cur.join("") + '\n', ""), err => { });
}
run();
