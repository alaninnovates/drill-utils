export type FrontBack =
    | 'Front Side Line'
    | 'Front Hash (HS)'
    | 'Back Hash (HS)'
    | 'Back Side Line';

export type DotbookEntry = {
    set: string;
    counts: number;
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
        counts: 0,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '2',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '3',
        counts: 16,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '3A',
        counts: 16,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '4',
        counts: 16,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '5',
        counts: 12,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '5A',
        counts: 16,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '6',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '6A',
        counts: 24,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '6B',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '7',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '7A',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 4,
        },
    },
    {
        set: '7B',
        counts: 13,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 1,
        },
    },
    {
        set: '8',
        counts: 3,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 1,
        },
    },
    {
        set: '8A',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 1,
        },
    },
    {
        set: '9',
        counts: 16,
        side: 2,
        sideToSide: {
            yardline: 30,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'Behind',
            stepOffset: 1,
        },
    },
    {
        set: '9A',
        counts: 16,
        side: 2,
        sideToSide: {
            yardline: 35,
            stepOffsetDirection: 'Inside',
            stepOffset: 0,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'In Front Of',
            stepOffset: 4,
        },
    },
    {
        set: '10',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 35,
            stepOffsetDirection: 'Inside',
            stepOffset: 0,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'In Front Of',
            stepOffset: 4,
        },
    },
    {
        set: '10A',
        counts: 12,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Outside',
            stepOffset: 3,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'In Front Of',
            stepOffset: 6,
        },
    },
    {
        set: '11',
        counts: 3,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Outside',
            stepOffset: 3,
        },
        frontToBack: {
            line: 'Front Hash (HS)',
            stepOffsetDirection: 'In Front Of',
            stepOffset: 6,
        },
    },
    {
        set: '12',
        counts: 17,
        side: 2,
        sideToSide: {
            yardline: 45,
            stepOffsetDirection: 'Outside',
            stepOffset: 4,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '13',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 1,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 7.5,
        },
    },
    {
        set: '14',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 45,
            stepOffsetDirection: 'Outside',
            stepOffset: 4,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 11,
        },
    },
    {
        set: '15',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 45,
            stepOffsetDirection: 'Inside',
            stepOffset: 3,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 11,
        },
    },
    {
        set: '16',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 50,
            stepOffsetDirection: 'Outside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 7.5,
        },
    },
    {
        set: '17',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 50,
            stepOffsetDirection: 'Outside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 7.5,
        },
    },
    {
        set: '17A',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 50,
            stepOffsetDirection: 'Outside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 7.5,
        },
    },
    {
        set: '17B',
        counts: 6,
        side: 2,
        sideToSide: {
            yardline: 45,
            stepOffsetDirection: 'Inside',
            stepOffset: 0,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '17C',
        counts: 6,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '18',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '18A',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '18B',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '19',
        counts: 4,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '19A',
        counts: 16,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '20',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '21',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 8,
        },
    },
    {
        set: '21A',
        counts: 12,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 10,
        },
    },
    {
        set: '22',
        counts: 8,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 1,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 9,
        },
    },
    {
        set: '23',
        counts: 24,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 1,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 9,
        },
    },
    {
        set: '23A',
        counts: 14,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 1,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 9,
        },
    },
    {
        set: '24',
        counts: 2,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 1,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 9,
        },
    },
    {
        set: '25',
        counts: 12,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2.25,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 6.75,
        },
    },
    {
        set: '25A',
        counts: 28,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2.25,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 6.75,
        },
    },
    {
        set: '26',
        counts: 6,
        side: 2,
        sideToSide: {
            yardline: 40,
            stepOffsetDirection: 'Inside',
            stepOffset: 2.25,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 6.75,
        },
    },
    {
        set: '27',
        counts: 12,
        side: 2,
        sideToSide: {
            yardline: 45,
            stepOffsetDirection: 'Outside',
            stepOffset: 2,
        },
        frontToBack: {
            line: 'Front Side Line',
            stepOffsetDirection: 'Behind',
            stepOffset: 4.25,
        },
    },
];
