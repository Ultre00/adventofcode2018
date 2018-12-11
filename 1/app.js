const fs = require('fs');
const readline = require('readline');

let found = false;
let result = [0];
let frequency = 0;

adjustFrequency = (input) => {
    frequency += input;
    found = result.find(m => m === frequency);
    result.push(frequency);
}

readFile = () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input'),
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        adjustFrequency(Number(line))
        if (found)
            rl.close();
    });

    rl.on('close', () => {
        runs++;
        if(!found){            
            readFile();
        } else{
            console.log(`found it: ${frequency}`);
        }
    });
}

readFile();
