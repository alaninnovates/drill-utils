import { Circle, Text, useTransformContext } from 'mafs';
import { dotData2025, dotData2025MV2 } from '../dot/data';
import { instrumentToColor } from '../dot/color';
import { dotToFieldCoordinate } from '../dot/parser';
import React from 'react';
import { useDrillStore } from '../state/drill-store-provider';

export const OtherPerformers = ({ currentIndex }: { currentIndex: number }) => {
    const { viewTransform } = useTransformContext();
    const { views, currentView, movement } = useDrillStore((state) => state);
    const activeView = currentView ? views[currentView] : null;

    if (activeView?.individualOnly) return null;

    return (
        <>
            {Object.values(movement === 1 ? dotData2025 : dotData2025MV2).map(
                ({ id, performer, label, dots }) => {
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
