import { dotData2025 } from './data';

export const sections = Object.values(dotData2025)
    .map((d) => d.performer)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
