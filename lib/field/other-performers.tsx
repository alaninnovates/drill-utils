import { Circle, Text, useTransformContext } from 'mafs';
import { dotData2025 } from '../dot/data';
import { instrumentToColor } from '../dot/color';
import { dotToFieldCoordinate } from '../dot/parser';
import React from 'react';
import { useDrillStore } from '../state/drill-store-provider';
import { useColorScheme } from '../hooks/useColorScheme';
import { interpolatePosition } from '../utils';

export const OtherPerformers = ({
    currentIndex,
    animationProgress,
    setLabelOfInterest,
}: {
    currentIndex: number;
    animationProgress: number;
    setLabelOfInterest: (label: string) => void;
}) => {
    const { viewTransform } = useTransformContext();
    const { views, currentView } = useDrillStore((state) => state);
    const { isDarkMode } = useColorScheme();

    const activeView = currentView ? views[currentView] : null;

    if (activeView?.individualOnly) return null;

    return (
        <>
            {Object.values(dotData2025).map(({ performer, label, dots }) => {
                if (dots[currentIndex] == null) {
                    console.log(
                        `No dot for performer ${performer} ${label} at index ${currentIndex}`,
                    );
                    return null;
                }
                if (
                    activeView &&
                    activeView.hiddenSections.includes(performer)
                ) {
                    return null;
                }

                let coord = dotToFieldCoordinate(dots[currentIndex]);
                if (animationProgress > 0 && dots[currentIndex + 1] != null) {
                    const nextCoord = dotToFieldCoordinate(
                        dots[currentIndex + 1],
                    );
                    coord = interpolatePosition(
                        coord,
                        nextCoord,
                        animationProgress,
                    );
                }

                return (
                    <React.Fragment key={label}>
                        <Circle
                            key={label}
                            center={[coord.x, coord.y]}
                            radius={
                                1 /
                                (Math.log(viewTransform['0']) / Math.log(2.5))
                            }
                            color={instrumentToColor(performer)}
                            fillOpacity={1}
                            svgEllipseProps={{
                                onClick: () => setLabelOfInterest(label),
                            }}
                        />
                        <Text
                            key={`text-${label}`}
                            x={coord.x}
                            y={coord.y}
                            color={isDarkMode ? 'white' : 'black'}
                            size={viewTransform['0'] * 0.148 * 2}
                            svgTextProps={{
                                onClick: () => setLabelOfInterest(label),
                            }}
                        >
                            {label}
                        </Text>
                    </React.Fragment>
                );
            })}
        </>
    );
};
