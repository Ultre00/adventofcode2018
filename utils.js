const fs = require('fs');
const readline = require('readline');

exports.readFile = async (file) => {
    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    });

    return await new Promise((resolve, reject) => {
        const data = [];

        rl.on('line', (line) => {
            data.push(line);
        });
    
        rl.on('close', () => {
            resolve(data)
        });
    })    
}