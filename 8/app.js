const utils = require('../utils');

const parseData = input => input[0].split(" ").map(m => Number(m))

const toNode = (data) => {
    const header = data.splice(0, 2);
    let node = { }    

    for (let i = 0; i < header[0]; i++) {

        if (i === 0)
            node.nodes = [];
        node.nodes.push(toNode(data))
    }

    node.metadataEntries = data.splice(0, header[1]);
    return node;
}

const countMetadataEntries = node => {
    return (node.nodes ? node.nodes.reduce((result, cur) => result + countMetadataEntries(cur), 0) : 0) + node.metadataEntries.reduce((result, cur) => result + cur)
};

const run = async () => {
    let input = await utils.readFile('./input');
    const data = parseData(input);
    const root = toNode(data);
    const result = countMetadataEntries(root);
    console.log(result);
}
run();
