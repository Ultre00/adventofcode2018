const fs = require('fs');
const readline = require('readline');

const data = [];

processData = () => {
    let wrong = 0
    let wrongIndex = -1;
    for (let i = 1; i < data.length; i++) {
        const element = data[i];
        for (let j = 0; j < i; j++) {
            const element2 = data[j];
            for (let k = 0; k < element.length; k++) {
                if (element[k] !== element2[k]) {
                    wrong++;
                    wrongIndex = k;
                }
                if(wrong > 1)
                    break;
            }
            if (wrong === 1) {                
                console.log(`${element.substring(0, wrongIndex)}${element.substring(wrongIndex + 1, element.length)}`);
                break;
            }
            wrong = 0;
        }
        if (wrong === 1)
            break;
    }
}

readFile = () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('./input'),
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        data.push(line);
    });

    rl.on('close', () => {
        processData()
    });
}
readFile();