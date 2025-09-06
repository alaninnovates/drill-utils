'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DotbookEntry, FrontBack, sampleDotbook } from '@/lib/dot/sample';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import { Button } from '@/components/ui/button';
import { SelectInstrumentDialog } from './select-instrument.dialog';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
    const { pages, addPage, modifyPage, clearPages } = useDrillStore(
        (store) => store,
    );

    const updateDot = (index: number, updatedDot: Partial<DotbookEntry>) => {
        modifyPage(index, updatedDot);
    };

    const updateSideToSide = (
        index: number,
        field: keyof DotbookEntry['sideToSide'],
        value: number | string,
    ) => {
        modifyPage(index, {
            sideToSide: {
                ...pages[index].sideToSide,
                [field]:
                    field === 'yardline' || field === 'stepOffset'
                        ? Number(value)
                        : value,
            },
        });
    };

    const updateFrontToBack = (
        index: number,
        field: keyof DotbookEntry['frontToBack'],
        value: number | string,
    ) => {
        modifyPage(index, {
            frontToBack: {
                ...pages[index].frontToBack,
                [field]: field === 'stepOffset' ? Number(value) : value,
            },
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="mb-4">
                <Link href="/viewer">
                    <Button variant="link">
                        <ArrowLeft />
                        Back to Drill Viewer
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Dots</CardTitle>
                    <CardDescription>View and edit pages</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24">Set</TableHead>
                                <TableHead className="w-24">Side</TableHead>
                                <TableHead>Side to Side</TableHead>
                                <TableHead>Front to Back</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pages.map((dot, index) => (
                                <TableRow key={`${dot.set}-${index}`}>
                                    <TableCell className="font-medium">
                                        <Input
                                            value={dot.set}
                                            onChange={(e) =>
                                                updateDot(index, {
                                                    set: e.target.value,
                                                })
                                            }
                                            className="w-24"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={dot.side.toString()}
                                            onValueChange={(value) =>
                                                updateDot(index, {
                                                    side: parseInt(value),
                                                })
                                            }
                                        >
                                            <SelectTrigger className="w-24">
                                                <SelectValue placeholder="Side" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    Side 1
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Side 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                type="number"
                                                value={
                                                    dot.sideToSide.stepOffset
                                                }
                                                onChange={(e) =>
                                                    updateSideToSide(
                                                        index,
                                                        'stepOffset',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-16"
                                            />
                                            <span>steps</span>
                                            <Select
                                                value={
                                                    dot.sideToSide
                                                        .stepOffsetDirection
                                                }
                                                onValueChange={(value) =>
                                                    updateSideToSide(
                                                        index,
                                                        'stepOffsetDirection',
                                                        value as
                                                            | 'Inside'
                                                            | 'Outside',
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-28">
                                                    <SelectValue placeholder="Direction" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Inside">
                                                        Inside
                                                    </SelectItem>
                                                    <SelectItem value="Outside">
                                                        Outside
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                type="number"
                                                value={dot.sideToSide.yardline}
                                                onChange={(e) =>
                                                    updateSideToSide(
                                                        index,
                                                        'yardline',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-16"
                                            />
                                            <span>yd ln</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                type="number"
                                                value={
                                                    dot.frontToBack.stepOffset
                                                }
                                                onChange={(e) =>
                                                    updateFrontToBack(
                                                        index,
                                                        'stepOffset',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-16"
                                            />
                                            <span>steps</span>
                                            <Select
                                                value={
                                                    dot.frontToBack
                                                        .stepOffsetDirection
                                                }
                                                onValueChange={(value) =>
                                                    updateFrontToBack(
                                                        index,
                                                        'stepOffsetDirection',
                                                        value as
                                                            | 'In Front Of'
                                                            | 'Behind',
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-36">
                                                    <SelectValue placeholder="Direction" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="In Front Of">
                                                        In Front Of
                                                    </SelectItem>
                                                    <SelectItem value="Behind">
                                                        Behind
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select
                                                value={dot.frontToBack.line}
                                                onValueChange={(value) =>
                                                    updateFrontToBack(
                                                        index,
                                                        'line',
                                                        value as FrontBack,
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-40">
                                                    <SelectValue placeholder="Line" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Front Side Line">
                                                        Front Side Line
                                                    </SelectItem>
                                                    <SelectItem value="Front Hash (HS)">
                                                        Front Hash (HS)
                                                    </SelectItem>
                                                    <SelectItem value="Back Hash (HS)">
                                                        Back Hash (HS)
                                                    </SelectItem>
                                                    <SelectItem value="Back Side Line">
                                                        Back Side Line
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </TableCell>
                                </TableRow>
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
                                <Button className="ml-2">
                                    Select Instrument
                                </Button>
                            }
                        />
                        <Button
                            className="ml-2"
                            variant="destructive"
                            onClick={() => clearPages()}
                        >
                            Clear All
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
