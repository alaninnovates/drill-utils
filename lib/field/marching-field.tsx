'use client';
import React from 'react';
import { Circle, Line, Mafs, Text } from 'mafs';
import 'mafs/core.css';

import { FIELD_LENGTH, FIELD_WIDTH } from './field-constants';
import { FieldContainer } from './field-container';
import { FieldGridLines } from './field-grid-lines';
import { dotToFieldCoordinate } from '../dot/parser';
import { sampleDotbook } from '../dot/sample';

export const MarchingField = () => {
    const coords = sampleDotbook.map(dotToFieldCoordinate);
    return (
        <Mafs
            viewBox={{ x: [0, FIELD_LENGTH], y: [0, FIELD_WIDTH] }}
            zoom={{ min: 0.9, max: 4 }}
            pan
            preserveAspectRatio="contain"
            height={document.documentElement.clientHeight - 20}
        >
            <FieldContainer />
            <FieldGridLines />
            {coords.map((coord, index) => (
                <>
                    <Circle
                        key={index}
                        center={[coord.x, coord.y]}
                        radius={0.2}
                        color="blue"
                        fillOpacity={1}
                    />
                    <Text
                        key={`text-${index}`}
                        x={coord.x}
                        y={coord.y}
                        size={15}
                        color="black"
                    >
                        {index + 1}
                    </Text>
                    {index !== 0 && (
                        <Line.Segment
                            point1={[coords[index - 1].x, coords[index - 1].y]}
                            point2={[coord.x, coord.y]}
                            color="blue"
                        />
                    )}
                </>
            ))}
        </Mafs>
    );
};
