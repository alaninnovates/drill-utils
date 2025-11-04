import { Circle, Line, Polygon, Text, useTransformContext, vec } from 'mafs';
import React from 'react';
import { calculateMidset, dotToFieldCoordinate } from '../dot/parser';
import { useDrillStore } from '../state/drill-store-provider';
import { DotbookEntry } from '../dot/types';
import { useColorScheme } from '../hooks/useColorScheme';

const CurrentPageDisplay = ({
    coord,
    label,
    viewTransform,
}: {
    coord: { x: number; y: number };
    label: string;
    viewTransform: vec.Matrix;
}) => {
    const { isDarkMode } = useColorScheme();
    return (
        <>
            <Circle
                center={[coord.x, coord.y]}
                radius={1 / (Math.log(viewTransform['0']) / Math.log(2.5))}
                color="red"
                fillOpacity={1}
            />
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
                color={isDarkMode ? 'white' : 'black'}
                size={viewTransform['0'] * 0.148 * 2}
            >
                {label}
            </Text>
        </>
    );
};

const AdditionalPagesDisplay = ({
    pages,
    currentIndex,
    additionalDots,
    direction,
}: {
    pages: DotbookEntry[];
    currentIndex: number;
    additionalDots: DotbookEntry[];
    direction: number;
}) => {
    return (
        <>
            {additionalDots.map((dot, index) => {
                const currentCoord = dotToFieldCoordinate(dot);
                const nextCoord = dotToFieldCoordinate(
                    additionalDots[index + 1] || pages[currentIndex],
                );
                const midCoord = calculateMidset(currentCoord, nextCoord);

                return (
                    <React.Fragment key={index}>
                        <Circle
                            center={[currentCoord.x, currentCoord.y]}
                            radius={0.2}
                            color="red"
                            fillOpacity={1}
                        />
                        <Line.Segment
                            point1={[currentCoord.x, currentCoord.y]}
                            point2={[nextCoord.x, nextCoord.y]}
                            color={direction === -1 ? 'blue' : 'green'}
                        />
                        {(currentCoord.x !== nextCoord.x ||
                            currentCoord.y !== nextCoord.y) && (
                            <Circle
                                center={midCoord}
                                radius={0.1}
                                color={direction === -1 ? 'blue' : 'green'}
                                fillOpacity={1}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export const ActivePerformer = ({
    currentIndex,
    label,
}: {
    currentIndex: number;
    label: string;
}) => {
    const { viewTransform } = useTransformContext();

    const { pages, views, currentView } = useDrillStore((state) => state);
    const activeView = currentView ? views[currentView] : null;
    const minusDots = activeView?.minusQuantity
        ? pages.slice(
              Math.max(0, currentIndex - activeView.minusQuantity),
              currentIndex,
          )
        : [];
    const plusDots = activeView?.plusQuantity
        ? pages.slice(
              currentIndex + 1,
              Math.min(
                  pages.length,
                  currentIndex + 1 + activeView.plusQuantity,
              ),
          )
        : [];

    return (
        <>
            <AdditionalPagesDisplay
                pages={pages}
                currentIndex={currentIndex}
                additionalDots={minusDots}
                direction={-1}
            />
            <AdditionalPagesDisplay
                pages={pages}
                currentIndex={currentIndex}
                additionalDots={plusDots}
                direction={1}
            />
            <CurrentPageDisplay
                coord={dotToFieldCoordinate(pages[currentIndex])}
                label={label}
                viewTransform={viewTransform}
            />
        </>
    );
};
