const players = 425;
const lastMarblePoints = 7084800

let score = {}
let currentPlayer = 0;
let currentMarblePoints = 1;
let currentMarble = 0;
let field = [0];

for (let i = 0; i < players; i++) {
    score[i] = 0;
}

while (currentMarblePoints <= lastMarblePoints) {

    if (currentMarblePoints % 23 === 0) {
        currentMarble = ((currentMarble - 7) % field.length + field.length) % field.length;
        score[currentPlayer] += currentMarblePoints + field.splice(currentMarble, 1)[0];
    } else {
        currentMarble = (currentMarble + 2) % field.length;
        field.splice(currentMarble, 0, currentMarblePoints);
    }

    currentPlayer = (currentPlayer + 1) % players;
    currentMarblePoints++;

    if (currentMarblePoints % 70848 === 0) {
        console.log(`${currentMarblePoints / 7084800 * 100}%`);
    }
}

console.log(Math.max(...Object.values(score)));