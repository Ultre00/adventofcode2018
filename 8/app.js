const utils = require('../utils');

const parseData = input => input[0].split(" ").map(m => Number(m))

const toNode = (data) => {
    const header = data.splice(0, 2);
    let node = {}

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

const countMetadataEntriesPart2 = node => {
    if (node.nodes) {
        return node.metadataEntries.filter(m => m > 0 && node.nodes[m-1]).reduce((result, cur) => {
            return result + countMetadataEntriesPart2(node.nodes[cur-1]);
        }, 0);
    } else {
        return node.metadataEntries.reduce((result, cur) => result + cur);
    }
    return 0;
}

const run = async () => {
    let input = await utils.readFile('./input');
    const data = parseData(input);
    const root = toNode(data);
    const result = countMetadataEntriesPart2(root);
    console.log(result);
}
run();
