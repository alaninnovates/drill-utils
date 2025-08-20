import {
    FIELD_LENGTH,
    FIELD_WIDTH,
    END_ZONE,
    FRONT_HASH_Y,
    BACK_HASH_Y,
} from '../field/field-constants';
import { DotbookEntry } from './sample';

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
