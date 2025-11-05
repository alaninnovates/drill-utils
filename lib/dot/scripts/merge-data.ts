import fs from 'fs';
import { dotData2025 } from './mv1';
import { dotData2025MV2 } from './mv2';
import { dotData2025MV3 } from './mv3';
import { DotbookEntry } from '../types';

const mergedDotData2025: {
    [key: string]: {
        performer: string;
        symbol: string;
        label: string;
        dots: DotbookEntry[];
    };
} = {};

const movementMap = {
    1: dotData2025,
    2: dotData2025MV2,
    3: dotData2025MV3,
};

for (const [movement, dotData] of Object.entries(movementMap)) {
    for (const [key, entry] of Object.entries(dotData)) {
        if (!mergedDotData2025[key]) {
            mergedDotData2025[key] = {
                performer: entry.performer,
                symbol: entry.symbol,
                label: entry.label,
                dots: [],
            };
        }
        mergedDotData2025[key].dots.push(
            // @ts-ignore
            ...entry.dots.map((dot) => ({
                ...dot,
                movement: Number(movement),
            })),
        );
    }
}

console.log(JSON.stringify(mergedDotData2025, null, 2));
fs.writeFileSync(
    './mergedDotData2025.json',
    JSON.stringify(mergedDotData2025, null, 2),
);
