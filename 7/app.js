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
    while (Object.keys(remainingNodes).length) {        
        const nextNode = getNextNode(result, remainingNodes);
        result += nextNode;
        delete remainingNodes[nextNode];
    }
    console.log(result);
}

const getNextNode = (result, remainingNodes) => {
    let possibleNodes = Object.entries(remainingNodes).filter(m => m[1].every(n => result.includes(n))).map(m => m[0]);
    return(possibleNodes.sort().shift());
}

const run = async () => {
    let input = await utils.readFile('./input');
    const data = parseData(input);
    processData(data);
}
run();
