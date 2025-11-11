import React from 'react';
import { Polygon } from 'mafs';
import { FIELD_LENGTH, END_ZONE, FIELD_WIDTH } from './field-constants';
import { useColorScheme } from '../hooks/useColorScheme';
import { useDrillStore } from '../state/drill-store-provider';

export const FieldContainer = ({
    setLabelOfInterest,
}: {
    setLabelOfInterest: (label: string) => void;
}) => {
    const { isDarkMode } = useColorScheme();
    const { label } = useDrillStore((state) => state);

    return (
        <>
            <Polygon
                points={[
                    [0, 0],
                    [FIELD_LENGTH, 0],
                    [FIELD_LENGTH, FIELD_WIDTH],
                    [0, FIELD_WIDTH],
                ]}
                color={isDarkMode ? '#106b21' : '#ffffff'}
                strokeOpacity={1}
                svgPolygonProps={{
                    onClick: () => setLabelOfInterest(label),
                }}
            />

            {/* end zones */}
            <Polygon
                points={[
                    [0, 0],
                    [END_ZONE, 0],
                    [END_ZONE, FIELD_WIDTH],
                    [0, FIELD_WIDTH],
                ]}
                color="#00ff00"
                strokeOpacity={1}
            />
            <Polygon
                points={[
                    [FIELD_LENGTH - END_ZONE, 0],
                    [FIELD_LENGTH, 0],
                    [FIELD_LENGTH, FIELD_WIDTH],
                    [FIELD_LENGTH - END_ZONE, FIELD_WIDTH],
                ]}
                color="#00ff00"
                strokeOpacity={1}
            />
        </>
    );
};
