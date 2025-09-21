import { Circle, Text, useTransformContext } from 'mafs';
import { dotData2025 } from '../dot/data';
import { instrumentToColor } from '../dot/color';
import { dotToFieldCoordinate } from '../dot/parser';
import React from 'react';

export const OtherPerformers = ({ currentIndex }: { currentIndex: number }) => {
    const { viewTransform } = useTransformContext();
    return (
        <>
            {Object.values(dotData2025).map(
                ({ id, performer, label, dots }) => {
                    if (dots[currentIndex] == null) {
                        console.log(
                            `No dot for performer ${performer} ${label} at index ${currentIndex}`,
                        );
                    }
                    const coord = dotToFieldCoordinate(dots[currentIndex]);
                    return (
                        <React.Fragment key={id}>
                            <Circle
                                key={id}
                                center={[coord.x, coord.y]}
                                radius={0.2}
                                color={instrumentToColor(performer)}
                                fillOpacity={1}
                            />
                            <Text
                                key={`text-${id}`}
                                x={coord.x}
                                y={coord.y}
                                color="white"
                                size={viewTransform['0'] * 0.148 * 2}
                            >
                                {label}
                            </Text>
                        </React.Fragment>
                    );
                },
            )}
        </>
    );
};
