'use client';

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { Button } from '@/components/ui/button';
import { SelectInstrumentDialog } from './select-instrument.dialog';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { dotData2025 } from '@/lib/dot/data';
import { DotRow } from './dot-row';
import { useShallow } from 'zustand/shallow';

export default function Page() {
    const pageLength = useDrillStore((store) => store.pages.length);
    const addPage = useDrillStore((store) => store.addPage);
    const clearPages = useDrillStore((store) => store.clearPages);
    const { setLabel, setInstrument, setMovement } = useDrillStore(
        useShallow((store) => ({
            setLabel: store.setLabel,
            setInstrument: store.setInstrument,
            setMovement: store.setMovement,
        })),
    );

    return (
        <div className="py-10 md:container md:mx-auto px-4">
            <div className="mb-4">
                <Link href="/">
                    <Button variant="link">
                        <ArrowLeft />
                        Home
                    </Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-24">Set</TableHead>
                        <TableHead className="w-24">Counts</TableHead>
                        <TableHead className="w-24">Side</TableHead>
                        <TableHead>Side to Side</TableHead>
                        <TableHead>Front to Back</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(pageLength)].map((_, index) => (
                        <DotRow key={index} index={index} />
                    ))}
                </TableBody>
            </Table>
            <div className="mt-4 flex">
                <Button
                    onClick={() => {
                        addPage({
                            set: '',
                            counts: 4,
                            side: 1,
                            sideToSide: {
                                yardline: 50,
                                stepOffsetDirection: 'Inside',
                                stepOffset: 0,
                            },
                            frontToBack: {
                                line: 'Front Hash (HS)',
                                stepOffsetDirection: 'In Front Of',
                                stepOffset: 0,
                            },
                        });
                    }}
                >
                    Add Page
                </Button>
                <SelectInstrumentDialog
                    trigger={
                        <Button className="ml-2 bg-blue-600">
                            Select Instrument
                        </Button>
                    }
                    onSelect={(data, instrument, movement) => {
                        clearPages();
                        console.log(data, instrument);
                        data[instrument].dots.forEach((dot) => addPage(dot));
                        setLabel(data[instrument].label);
                        setInstrument(data[instrument].performer);
                        setMovement(movement);
                    }}
                />
                <Button
                    className="ml-2"
                    variant="destructive"
                    onClick={() => clearPages()}
                >
                    Clear All
                </Button>
            </div>
        </div>
    );
}
