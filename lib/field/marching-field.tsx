'use client';
import React from 'react';
import { Mafs } from 'mafs';
import 'mafs/core.css';

import { FIELD_LENGTH, FIELD_WIDTH } from './field-constants';
import { FieldContainer } from './field-container';
import { FieldGridLines } from './field-grid-lines';

export const MarchingField = () => {
    return (
        <Mafs
            viewBox={{ x: [0, FIELD_LENGTH], y: [0, FIELD_WIDTH] }}
            zoom={{ min: 0.9, max: 4 }}
            pan
            preserveAspectRatio="contain"
        >
            <FieldContainer />
            <FieldGridLines />
        </Mafs>
    );
};
