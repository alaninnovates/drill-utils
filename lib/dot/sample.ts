export type FrontBack =
    | 'Front Side Line'
    | 'Front Hash (HS)'
    | 'Back Hash (HS)'
    | 'Back Side Line';

export type DotbookEntry = {
    set: string;
    side: number;
    sideToSide: {
        yardline: number;
        stepOffset: number;
        stepOffsetDirection: 'Inside' | 'Outside';
    };
    frontToBack: {
        line: FrontBack;
        stepOffset: number;
        stepOffsetDirection: 'In Front Of' | 'Behind';
    };
};

export const sampleDotbook: DotbookEntry[] = [
    {
        set: '1',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 3.5,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 2.5,
            stepOffsetDirection: 'In Front Of',
        },
    },
    {
        set: '2',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 3.5,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 2.5,
            stepOffsetDirection: 'In Front Of',
        },
    },
    {
        set: '3',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 3.5,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 2.5,
            stepOffsetDirection: 'In Front Of',
        },
    },
    {
        set: '4',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 3.5,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 2.5,
            stepOffsetDirection: 'In Front Of',
        },
    },
    {
        set: '5',
        side: 1,
        sideToSide: {
            yardline: 45,
            stepOffset: 3.0,
            stepOffsetDirection: 'Outside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 12.0,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '6',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 3.75,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 13.75,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '7',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 3.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 9.75,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '8',
        side: 1,
        sideToSide: {
            yardline: 45,
            stepOffset: 2.75,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 9.75,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '9',
        side: 2,
        sideToSide: {
            yardline: 50,
            stepOffset: 3.0,
            stepOffsetDirection: 'Outside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 11.75,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '10',
        side: 2,
        sideToSide: {
            yardline: 50,
            stepOffset: 0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 12.25,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '11',
        side: 1,
        sideToSide: {
            yardline: 45,
            stepOffset: 3.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 13.0,
            stepOffsetDirection: 'In Front Of',
        },
    },
    {
        set: '12',
        side: 1,
        sideToSide: {
            yardline: 50,
            stepOffset: 3.5,
            stepOffsetDirection: 'Outside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 10.0,
            stepOffsetDirection: 'In Front Of',
        },
    },
    {
        set: '13',
        side: 1,
        sideToSide: {
            yardline: 45,
            stepOffset: 2.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 10.0,
            stepOffsetDirection: 'In Front Of',
        },
    },
    {
        set: '14',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 1.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 12.0,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '14A',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 1.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 12.0,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '15',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 1.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 12.0,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '16',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 1.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 12.0,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '17',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 4.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffset: 12.0,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '18',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 4.0,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 0,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '19',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 1.0,
            stepOffsetDirection: 'Outside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 1.0,
            stepOffsetDirection: 'Behind',
        },
    },
    {
        set: '20',
        side: 1,
        sideToSide: {
            yardline: 40,
            stepOffset: 0.5,
            stepOffsetDirection: 'Inside',
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffset: 0.75,
            stepOffsetDirection: 'Behind',
        },
    },
];
