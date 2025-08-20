import React from 'react';
import { Line, Text, useTransformContext } from 'mafs';
import {
    FIELD_LENGTH,
    END_ZONE,
    FIELD_WIDTH,
    FRONT_HASH_Y,
    BACK_HASH_Y,
} from './field-constants';

export const FieldGridLines = () => {
    const { viewTransform } = useTransformContext();
    const showOneYardGrid = viewTransform['0'] > 28;

    const yardNumberAtX = (x: number) => {
        const fromLeftGoal = Math.max(0, x - END_ZONE);
        const fromRightGoal = Math.max(0, FIELD_LENGTH - END_ZONE - x);
        const minToGoal = Math.min(fromLeftGoal, fromRightGoal);
        return Math.round(minToGoal / 5) * 5;
    };

    const twoPointFiveYardXs = Array.from(
        { length: FIELD_LENGTH / 2.5 + 1 },
        (_, i) => i * 2.5,
    );
    const fiveYardXs = twoPointFiveYardXs.filter((x) => x % 5 === 0);
    const tickXs = Array.from(
        { length: FIELD_LENGTH / (5 / 8) + 1 },
        (_, i) => +(i * (5 / 8)).toFixed(2),
    );

    function generateHorizontalLines(fieldWidth: number) {
        const fiveYardYs: number[] = [];
        const tickYs: number[] = [];

        for (let y = fieldWidth - 2.5; y >= 0; y -= 2.5) {
            fiveYardYs.push(y);
        }

        for (let y = fieldWidth - 5 / 8; y >= 0; y -= 5 / 8) {
            tickYs.push(+y.toFixed(2));
        }

        return { fiveYardYs, tickYs };
    }

    const { fiveYardYs, tickYs } = generateHorizontalLines(FIELD_WIDTH);

    return (
        <>
            {/* 1-yard vertical grid between hashes */}
            {showOneYardGrid &&
                tickXs.map((x) => (
                    <Line.Segment
                        key={`grid-${x}`}
                        point1={[x, 0]}
                        point2={[x, FIELD_WIDTH]}
                        color="white"
                        opacity={0.15}
                    />
                ))}
            {twoPointFiveYardXs.map((x) => (
                <Line.Segment
                    key={`five-${x}`}
                    point1={[x, 0]}
                    point2={[x, FIELD_WIDTH]}
                    color="white"
                    weight={x % 5 === 0 ? 2.5 : 1.5}
                    opacity={x % 5 === 0 ? 0.9 : 0.6}
                />
            ))}
            {/* 1-yard horizontal grid */}
            {showOneYardGrid &&
                tickYs.map((y) => (
                    <Line.Segment
                        key={`hgrid-${y}`}
                        point1={[0, y]}
                        point2={[FIELD_LENGTH, y]}
                        color="white"
                        opacity={0.15}
                    />
                ))}
            {fiveYardYs.map((y) => (
                <Line.Segment
                    key={`hfive-${y}`}
                    point1={[0, y]}
                    point2={[FIELD_LENGTH, y]}
                    color="white"
                    weight={1.5}
                    opacity={0.6}
                />
            ))}

            {/* front/back hash */}
            <Line.Segment
                point1={[0, FRONT_HASH_Y]}
                point2={[FIELD_LENGTH, FRONT_HASH_Y]}
                color="white"
                weight={2}
                opacity={0.85}
            />
            <Line.Segment
                point1={[0, BACK_HASH_Y]}
                point2={[FIELD_LENGTH, BACK_HASH_Y]}
                color="white"
                weight={2}
                opacity={0.85}
            />

            {/* yard #s */}
            {fiveYardXs
                .filter((x) => x >= END_ZONE && x <= FIELD_LENGTH - END_ZONE)
                .map((x) => {
                    const n = yardNumberAtX(x);
                    if (n === 0 || n > 50) return null;
                    const topY = BACK_HASH_Y + 28.5;
                    const bottomY = FRONT_HASH_Y - 28.5;

                    const label = n === 50 ? 50 : n;
                    const mirrored = n === 50 ? 50 : n;

                    return (
                        <React.Fragment key={`num-${x}`}>
                            <Text
                                x={x}
                                y={bottomY}
                                size={18}
                                color="white"
                                attach="n"
                            >
                                {label}
                            </Text>
                            <Text
                                x={x}
                                y={topY}
                                size={18}
                                color="white"
                                attach="s"
                            >
                                {mirrored}
                            </Text>
                        </React.Fragment>
                    );
                })}

            {/* bold 50-yd line */}
            <Line.Segment
                point1={[FIELD_LENGTH / 2, 0]}
                point2={[FIELD_LENGTH / 2, FIELD_WIDTH]}
                color="white"
                weight={3}
                opacity={0.9}
            />
        </>
    );
};
