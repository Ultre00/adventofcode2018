const utils = require('../utils');

const parseData = input => {
    return input.reduce((result, row) => {
        const node = row.substring(36, 37);
        const preReqNode = row.substring(5, 6);
        return ({
            ...result,
            [node]: result[node] ? [...result[node], preReqNode] : [preReqNode],
            [preReqNode]: result[preReqNode] ? result[preReqNode] : []
        })
    }, {});
}

const processData = data => {
    let result = "";
    let remainingNodes = { ...data };
    let workingNodes = [];
    let timer = 0;
    while (Object.keys(remainingNodes).length) {
        const nextNodes = getNextNodes(result, remainingNodes).filter(m => !workingNodes.some(n => n[m])).map(m => ({ [m]: m.charCodeAt(0) - 4 }));

        while (workingNodes.length < 5 && nextNodes.length > 0) {
            workingNodes.push(nextNodes.shift());
        }

        const firstWorkerTimeCompletion = Math.min(...workingNodes.map(m => Object.values(m)));
        timer += firstWorkerTimeCompletion;
        workingNodes.forEach(m => {
            const node = Object.keys(m)[0];
            m[node] -= firstWorkerTimeCompletion;
            if (m[node] === 0) {
                result += node;
                delete remainingNodes[node];
            }
        })
        workingNodes = workingNodes.filter(m => Object.values(m)[0] !== 0);
    }
    console.log(timer);
}

const getNextNodes = (result, remainingNodes) => {
    let possibleNodes = Object.entries(remainingNodes).filter(m => m[1].every(n => result.includes(n))).map(m => m[0]);
    return (possibleNodes.sort());
}

const run = async () => {
    let input = await utils.readFile('./input');
    const data = parseData(input);
    processData(data);
}
run();
