const fs = require('fs');
const readline = require('readline');

let twos = 0, threes = 0;

readFile = () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input'),
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        let map = {};
        for (let i = 0; i < line.length; i++) {
            const char = line.charAt(i);
            map[char] = !map[char] ? 1 : map[char] + 1;
        }
        twos += Object.values(map).find(m => m === 2) ? 1 : 0;
        threes += Object.values(map).find(m => m === 3) ? 1 : 0;
    });

    rl.on('close', () => {
        console.log(twos * threes);
    });
}

readFile();
