import { Circle, Line, Polygon, Text, useTransformContext } from 'mafs';
import React from 'react';
import { instrumentToColor } from '../dot/color';
import { calculateMidset } from '../dot/parser';

export const ActivePerformer = ({
    dots,
    instrument,
    label,
}: {
    dots: { x: number; y: number }[];
    instrument: string;
    label: string;
}) => {
    const { viewTransform } = useTransformContext();

    return (
        <>
            {dots.map((coord, index) => (
                <React.Fragment key={index}>
                    <Circle
                        key={index}
                        center={[coord.x, coord.y]}
                        radius={0.2}
                        color={instrumentToColor(instrument)}
                        fillOpacity={1}
                    />
                    {index !== 0 && (
                        <>
                            <Line.Segment
                                point1={[dots[index - 1].x, dots[index - 1].y]}
                                point2={[coord.x, coord.y]}
                                color="blue"
                            />
                            {(coord.x !== dots[index - 1].x ||
                                coord.y !== dots[index - 1].y) && (
                                <Circle
                                    center={calculateMidset(
                                        dots[index - 1],
                                        coord,
                                    )}
                                    radius={0.1}
                                    color="white"
                                    fillOpacity={1}
                                />
                            )}
                        </>
                    )}
                    {index === dots.length - 1 && (
                        <>
                            <Polygon
                                points={[
                                    // square around the dot
                                    [coord.x - 0.4, coord.y - 0.4],
                                    [coord.x + 0.4, coord.y - 0.4],
                                    [coord.x + 0.4, coord.y + 0.4],
                                    [coord.x - 0.4, coord.y + 0.4],
                                ]}
                                color="red"
                            />
                            <Text
                                x={coord.x}
                                y={coord.y}
                                color="white"
                                size={viewTransform['0'] * 0.148 * 2}
                            >
                                {label}
                            </Text>
                        </>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};
