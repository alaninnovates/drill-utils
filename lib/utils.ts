import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const interpolatePosition = (
    startPos: { x: number; y: number },
    endPos: { x: number; y: number },
    progress: number,
): { x: number; y: number } => {
    return {
        x: startPos.x + (endPos.x - startPos.x) * progress,
        y: startPos.y + (endPos.y - startPos.y) * progress,
    };
};
