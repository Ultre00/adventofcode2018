const utils = require('../utils');

const parseData = data => {
    let result = [];
    data.forEach(row => {
        let entry = {};
        const endDate = row.indexOf("]");
        const idStart = row.indexOf("#");
        if (idStart >= 0) {
            const idEnd = row.indexOf('begins shift');
            const id = Number(row.substring(idStart + 1, idEnd));
            entry.id = id;
            entry.status = "begins shift";
        } else {
            entry.status = row.substring(endDate + 2, row.length);
        }
        entry.timestamp = row.substring(1, endDate);
        entry.minute = Number(entry.timestamp.substring(entry.timestamp.length - 2, entry.timestamp.length));
        result.push(entry);
    });
    return result.sort((a, b) => a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0);
}

const dataToSleepingSchedules = data => {
    let result = {}
    let currentGuardId = null;
    let tempFrom = 0;
    data.forEach(row => {
        if (row.id)
            currentGuardId = row.id;

        if (!result[currentGuardId])
            result[currentGuardId] = { sleepingMinutes: {}, sleeping: [] };

        if (row.status === "falls asleep") {
            tempFrom = row.minute;
        } else if (row.status === "wakes up") {
            result[currentGuardId].sleeping.push({ from: tempFrom, to: row.minute - 1 });
            for (let i = tempFrom; i < row.minute; i++) {
                if (!result[currentGuardId].sleepingMinutes[i]) {
                    result[currentGuardId].sleepingMinutes[i] = 1
                } else {
                    result[currentGuardId].sleepingMinutes[i] = result[currentGuardId].sleepingMinutes[i] + 1;
                }
            }
        }
    });

    Object.entries(result).forEach(guard => {
        result[guard[0]].totalSleep = Object.values(guard[1].sleepingMinutes).reduce((result, cur) => result + cur, 0);
    });
    return result;
}

const analyseSleepingSchedule = data => {
    const mostSleepingGuard = Object.entries(data).reduce((prev, cur) => prev[1].totalSleep > cur[1].totalSleep ? prev : cur);
    const mostAsleepMinute = Number((Object.entries(mostSleepingGuard[1].sleepingMinutes).reduce((prev, cur) => prev[1] > cur[1] ? prev : cur))[0]);
    console.log(mostSleepingGuard[0] * mostAsleepMinute);
}

const analyseSleepingSchedule2 = data => {
    const mostSleepingGuard = Object.entries(data).reduce((prev, cur) => {      
        return Math.max(...Object.values(prev[1].sleepingMinutes))> Math.max(...Object.values(cur[1].sleepingMinutes)) ? prev : cur
    });
    const mostAsleepMinute = Number((Object.entries(mostSleepingGuard[1].sleepingMinutes).reduce((prev, cur) => prev[1] > cur[1] ? prev : cur))[0]);
    console.log(mostSleepingGuard[0] * mostAsleepMinute);
}

const run = async () => {
    const rawData = await utils.readFile('./input');
    const data = parseData(rawData);
    const sleepingSchedules = dataToSleepingSchedules(data);
    analyseSleepingSchedule2(sleepingSchedules);
}
run();