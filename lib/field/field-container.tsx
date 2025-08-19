import React from 'react';
import { Polygon, Line } from 'mafs';
import { FIELD_LENGTH, END_ZONE, FIELD_WIDTH } from './field-constants';

export const FieldContainer = () => {
    return (
        <>
            <Polygon
                points={[
                    [0, 0],
                    [FIELD_LENGTH, 0],
                    [FIELD_LENGTH, FIELD_WIDTH],
                    [0, FIELD_WIDTH],
                ]}
                color="#106b21"
                strokeOpacity={1}
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

            {/* field outline */}
            <Line.Segment
                point1={[0, 0]}
                point2={[FIELD_LENGTH, 0]}
                color="white"
                weight={3}
            />
            <Line.Segment
                point1={[0, FIELD_WIDTH]}
                point2={[FIELD_LENGTH, FIELD_WIDTH]}
                color="white"
                weight={3}
            />
            <Line.Segment
                point1={[0, 0]}
                point2={[0, FIELD_WIDTH]}
                color="white"
                weight={3}
            />
            <Line.Segment
                point1={[FIELD_LENGTH, 0]}
                point2={[FIELD_LENGTH, FIELD_WIDTH]}
                color="white"
                weight={3}
            />
        </>
    );
};
