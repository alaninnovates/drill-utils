import { dotData2025, tempoData2025 } from './data';

const tempoMap: {
    [movement: number]: {
        [set: string]: number;
    };
} = {};

function compareKeys(a: string, b: string): number {
    const matchA = a.match(/^(\d+)([A-Z]*)$/i);
    const matchB = b.match(/^(\d+)([A-Z]*)$/i);
    if (!matchA || !matchB) return a.localeCompare(b);

    const numA = parseInt(matchA[1]);
    const numB = parseInt(matchB[1]);
    const letterA = matchA[2] || '';
    const letterB = matchB[2] || '';

    if (numA !== numB) return numA - numB;
    return letterA.localeCompare(letterB);
}

function getTempo(movement: number, set: string): number {
    const tempoKeys = Object.keys(tempoData2025[movement.toString()]);
    let applicableKey = tempoKeys[0];
    for (const key of tempoKeys) {
        if (compareKeys(key, set) <= 0) {
            applicableKey = key;
        } else {
            break;
        }
    }
    return tempoData2025[movement.toString()][applicableKey];
}

for (const dot of Object.values(dotData2025)[0].dots) {
    if (!tempoMap[dot.movement]) {
        tempoMap[dot.movement] = {};
    }
    tempoMap[dot.movement][dot.set] = getTempo(dot.movement, dot.set);
}

console.log(tempoMap);
export { tempoMap, getTempo };
