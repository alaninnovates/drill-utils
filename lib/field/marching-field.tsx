'use client';
import React, { useEffect, useState } from 'react';
import { Line, Mafs } from 'mafs';
import 'mafs/core.css';

import { FIELD_LENGTH, FIELD_WIDTH } from './field-constants';
import { FieldContainer } from './field-container';
import { FieldGridLines } from './field-grid-lines';
import { OtherPerformers } from './other-performers';
import { useDrillStore } from '../state/drill-store-provider';
import { ActivePerformer } from './active-performer';
import { useColorScheme } from '../hooks/useColorScheme';

export const MarchingField = ({
    currentIndex,
    animationProgress,
}: {
    currentIndex: number;
    animationProgress: number;
}) => {
    const { label } = useDrillStore((store) => store);
    const { isDarkMode } = useColorScheme();

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
            <style>{`
            .MafsView {
        color-scheme: light dark;

        --mafs-bg: light-dark(white, black);
        --mafs-fg: light-dark(black, white);

        --mafs-origin-color: var(--mafs-fg);
        --mafs-line-color: light-dark(#555, #aaa);
        --grid-line-subdivision-color: light-dark(#222, #444);

        --mafs-red: light-dark(#f11d0e, #ff7b72);
        --mafs-orange: light-dark(#f14e0e, #ff9b72);
        --mafs-yellow: light-dark(#ffe44a, #ffec9b);
        --mafs-green: light-dark(#15e272, #6fffb0);
        --mafs-blue: light-dark(#58a6ff, #9ecbff);
        --mafs-indigo: light-dark(#7c58ff, #b39eff);
        --mafs-violet: light-dark(#ae58ff, #d39eff);
        --mafs-pink: light-dark(#ee00ab, #ff7bde);
    }
    `}</style>
            <FieldContainer />
            <FieldGridLines />
            <OtherPerformers
                currentIndex={currentIndex}
                animationProgress={animationProgress}
            />
            <ActivePerformer
                currentIndex={currentIndex}
                animationProgress={animationProgress}
                label={label}
            />

            {/* field outline */}
            <Line.Segment
                point1={[0, 0]}
                point2={[FIELD_LENGTH, 0]}
                color={isDarkMode ? 'white' : 'black'}
                weight={3}
            />
            <Line.Segment
                point1={[0, FIELD_WIDTH]}
                point2={[FIELD_LENGTH, FIELD_WIDTH]}
                color={isDarkMode ? 'white' : 'black'}
                weight={3}
            />
            <Line.Segment
                point1={[0, 0]}
                point2={[0, FIELD_WIDTH]}
                color={isDarkMode ? 'white' : 'black'}
                weight={3}
            />
            <Line.Segment
                point1={[FIELD_LENGTH, 0]}
                point2={[FIELD_LENGTH, FIELD_WIDTH]}
                color={isDarkMode ? 'white' : 'black'}
                weight={3}
            />
        </Mafs>
    );
};
