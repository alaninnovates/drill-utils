import {
    FIELD_LENGTH,
    FIELD_WIDTH,
    END_ZONE,
    FRONT_HASH_Y,
    BACK_HASH_Y,
} from '../field/field-constants';
import { DotbookEntry } from './types';

const STEP_SIZE = 5 / 8;

// side 2 = left, side 1 = right
export const dotToFieldCoordinate = (
    dot: DotbookEntry,
): {
    x: number;
    y: number;
} => {
    let x;
    if (dot.side === 1) {
        // right side of field, inside = towards center(left)
        x =
            FIELD_LENGTH -
            END_ZONE -
            dot.sideToSide.yardline +
            (dot.sideToSide.stepOffsetDirection === 'Inside'
                ? -dot.sideToSide.stepOffset
                : dot.sideToSide.stepOffset) *
                STEP_SIZE;
    } else {
        // left side of field, inside = towards center(right)
        x =
            END_ZONE +
            dot.sideToSide.yardline +
            (dot.sideToSide.stepOffsetDirection === 'Inside'
                ? dot.sideToSide.stepOffset
                : -dot.sideToSide.stepOffset) *
                STEP_SIZE;
    }

    let y;
    switch (dot.frontToBack.line) {
        case 'Front Hash (HS)':
            y =
                FRONT_HASH_Y +
                (dot.frontToBack.stepOffsetDirection === 'In Front Of'
                    ? dot.frontToBack.stepOffset
                    : -dot.frontToBack.stepOffset) *
                    STEP_SIZE;
            break;
        case 'Back Hash (HS)':
            y =
                BACK_HASH_Y +
                (dot.frontToBack.stepOffsetDirection === 'In Front Of'
                    ? dot.frontToBack.stepOffset
                    : -dot.frontToBack.stepOffset) *
                    STEP_SIZE;
            break;
        case 'Front Side Line':
            y =
                FIELD_WIDTH +
                (dot.frontToBack.stepOffsetDirection === 'In Front Of'
                    ? dot.frontToBack.stepOffset
                    : -dot.frontToBack.stepOffset) *
                    STEP_SIZE;
            break;
        case 'Back Side Line':
            y =
                (dot.frontToBack.stepOffsetDirection === 'In Front Of'
                    ? dot.frontToBack.stepOffset
                    : -dot.frontToBack.stepOffset) * STEP_SIZE;
            break;
    }
    return { x, y };
};

export const calculateMidset = (
    coord1: { x: number; y: number },
    coord2: { x: number; y: number },
): [number, number] => {
    return [(coord1.x + coord2.x) / 2, (coord1.y + coord2.y) / 2];
};

export const fieldCoordinateToDot = (
    coord: [number, number],
): Omit<DotbookEntry, 'set' | 'counts' | 'movement'> => {
    const [x, y] = coord;

    let side: 1 | 2;
    let sideToSideYardline: number;
    let sideToSideStepOffset: number;
    let sideToSideStepOffsetDirection: 'Inside' | 'Outside';

    if (x >= FIELD_LENGTH / 2) {
        // right side
        side = 1;
        const distanceFromRightHash = FIELD_LENGTH - END_ZONE - x;
        sideToSideYardline = Math.round(distanceFromRightHash / 5) * 5;
        const offset =
            (x - (FIELD_LENGTH - END_ZONE - sideToSideYardline)) / STEP_SIZE;
        if (offset >= 0) {
            sideToSideStepOffset = Math.round(offset);
            sideToSideStepOffsetDirection = 'Outside';
        } else {
            sideToSideStepOffset = Math.round(-offset);
            sideToSideStepOffsetDirection = 'Inside';
        }
    } else {
        // left side
        side = 2;
        const distanceFromLeftHash = x - END_ZONE;
        sideToSideYardline = Math.round(distanceFromLeftHash / 5) * 5;
        const offset = (x - (END_ZONE + sideToSideYardline)) / STEP_SIZE;
        if (offset >= 0) {
            sideToSideStepOffset = Math.round(offset);
            sideToSideStepOffsetDirection = 'Inside';
        } else {
            sideToSideStepOffset = Math.round(-offset);
            sideToSideStepOffsetDirection = 'Outside';
        }
    }
    let frontToBackLine: DotbookEntry['frontToBack']['line'];
    let frontToBackStepOffset: number;
    let frontToBackStepOffsetDirection: 'In Front Of' | 'Behind';

    const distanceFromFrontHash = y - FRONT_HASH_Y;
    const distanceFromBackHash = y - BACK_HASH_Y;
    const distanceFromFrontSideline = y - FIELD_WIDTH;

    if (
        Math.abs(distanceFromFrontSideline) <=
            Math.abs(distanceFromFrontHash) &&
        Math.abs(distanceFromFrontSideline) <= Math.abs(distanceFromBackHash)
    ) {
        frontToBackLine = 'Front Side Line';
        const offset = distanceFromFrontSideline / STEP_SIZE;
        if (offset >= 0) {
            frontToBackStepOffset = Math.round(offset);
            frontToBackStepOffsetDirection = 'In Front Of';
        } else {
            frontToBackStepOffset = Math.round(-offset);
            frontToBackStepOffsetDirection = 'Behind';
        }
    } else if (
        Math.abs(distanceFromFrontHash) <= Math.abs(distanceFromBackHash)
    ) {
        frontToBackLine = 'Front Hash (HS)';
        const offset = distanceFromFrontHash / STEP_SIZE;
        if (offset >= 0) {
            frontToBackStepOffset = Math.round(offset);
            frontToBackStepOffsetDirection = 'In Front Of';
        } else {
            frontToBackStepOffset = Math.round(-offset);
            frontToBackStepOffsetDirection = 'Behind';
        }
    } else {
        frontToBackLine = 'Back Hash (HS)';
        const offset = distanceFromBackHash / STEP_SIZE;
        if (offset >= 0) {
            frontToBackStepOffset = Math.round(offset);
            frontToBackStepOffsetDirection = 'In Front Of';
        } else {
            frontToBackStepOffset = Math.round(-offset);
            frontToBackStepOffsetDirection = 'Behind';
        }
    }

    return {
        side,
        sideToSide: {
            yardline: sideToSideYardline,
            stepOffset: sideToSideStepOffset,
            stepOffsetDirection: sideToSideStepOffsetDirection,
        },
        frontToBack: {
            line: frontToBackLine,
            stepOffset: frontToBackStepOffset,
            stepOffsetDirection: frontToBackStepOffsetDirection,
        },
    };
};

export const dotCoordinatesEqual = (dot1: DotbookEntry, dot2: DotbookEntry) => {
    return (
        dot1.side === dot2.side &&
        dot1.sideToSide.yardline === dot2.sideToSide.yardline &&
        dot1.sideToSide.stepOffset === dot2.sideToSide.stepOffset &&
        dot1.sideToSide.stepOffsetDirection ===
            dot2.sideToSide.stepOffsetDirection &&
        dot1.frontToBack.line === dot2.frontToBack.line &&
        dot1.frontToBack.stepOffset === dot2.frontToBack.stepOffset &&
        dot1.frontToBack.stepOffsetDirection ===
            dot2.frontToBack.stepOffsetDirection
    );
};

export const calculateStepSize = (
    dot1: DotbookEntry,
    dot2: DotbookEntry,
    counts: number,
): number => {
    const coord1 = dotToFieldCoordinate(dot1);
    const coord2 = dotToFieldCoordinate(dot2);
    const yards = Math.sqrt(
        Math.pow(coord2.x / STEP_SIZE - coord1.x / STEP_SIZE, 2) +
            Math.pow(coord2.y / STEP_SIZE - coord1.y / STEP_SIZE, 2),
    );
    return Math.round(((8 * yards) / counts) * 100) / 100;
};
