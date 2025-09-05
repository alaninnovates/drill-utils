'use client';
import React, { useEffect, useState } from 'react';
import { Circle, Line, Mafs } from 'mafs';
import 'mafs/core.css';

import { FIELD_LENGTH, FIELD_WIDTH } from './field-constants';
import { FieldContainer } from './field-container';
import { FieldGridLines } from './field-grid-lines';

export const MarchingField = ({
    dots,
}: {
    dots: { x: number; y: number }[];
}) => {
    const [clientHeight, setClientHeight] = useState(0);
    useEffect(() => {
        setClientHeight(document.documentElement.clientHeight);
    }, []);

    return (
        <Mafs
            viewBox={{ x: [0, FIELD_LENGTH], y: [0, FIELD_WIDTH] }}
            zoom={{ min: 0.9, max: 10 }}
            pan
            preserveAspectRatio="contain"
            height={clientHeight}
        >
            <FieldContainer />
            <FieldGridLines />
            {dots.map((coord, index) => (
                <React.Fragment key={index}>
                    <Circle
                        key={index}
                        center={[coord.x, coord.y]}
                        radius={0.2}
                        color={index === dots.length - 1 ? 'red' : 'blue'}
                        fillOpacity={1}
                    />
                    {index !== 0 && (
                        <Line.Segment
                            point1={[dots[index - 1].x, dots[index - 1].y]}
                            point2={[coord.x, coord.y]}
                            color="blue"
                        />
                    )}
                </React.Fragment>
            ))}
        </Mafs>
    );
};
