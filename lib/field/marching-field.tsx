'use client';
import React, { useEffect, useState } from 'react';
import { Mafs } from 'mafs';
import 'mafs/core.css';

import { FIELD_LENGTH, FIELD_WIDTH } from './field-constants';
import { FieldContainer } from './field-container';
import { FieldGridLines } from './field-grid-lines';
import { OtherPerformers } from './other-performers';
import { useDrillStore } from '../state/drill-store-provider';
import { ActivePerformer } from './active-performer';

export const MarchingField = ({ currentIndex }: { currentIndex: number }) => {
    const { label } = useDrillStore((store) => store);

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
            <OtherPerformers currentIndex={currentIndex} />
            <ActivePerformer currentIndex={currentIndex} label={label} />
        </Mafs>
    );
};
