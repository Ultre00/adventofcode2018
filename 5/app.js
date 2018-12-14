const utils = require('../utils');

const processString = data => {
    let result = data;

    for (let i = 0; i < result.length; i++) {
        if ((i + 1 < result.length && result[i] !== result[i + 1] && result[i].toUpperCase() === result[i + 1].toUpperCase())) {
            result = result.slice(0, i) + result.slice(i + 2, result.length);
            i = Math.max(-1, i - 2);
        }
    }

    return result;
}

const run = async () => {
    let input = (await utils.readFile('./input'))[0];
    let result = processString(input);
}
run();
