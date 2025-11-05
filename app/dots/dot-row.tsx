import React from 'react';
import { DotbookEntry, FrontBack } from '@/lib/dot/types';
import { TableCell, TableRow } from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useDrillStore } from '@/lib/state/drill-store-provider';

export const DotRow = ({ index }: { index: number }) => {
    const page = useDrillStore((store) => store.pages[index]);
    const modifyPage = useDrillStore((store) => store.modifyPage);

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
                ...page.sideToSide,
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
                ...page.frontToBack,
                [field]: field === 'stepOffset' ? Number(value) : value,
            },
        });
    };

    return (
        <TableRow key={index}>
            <TableCell className="font-medium">
                <Input
                    value={page.movement}
                    onChange={(e) =>
                        updateDot(index, {
                            movement: Number(e.target.value),
                        })
                    }
                    className="w-12"
                />
            </TableCell>
            <TableCell className="font-medium">
                <Input
                    value={page.set}
                    onChange={(e) =>
                        updateDot(index, {
                            set: e.target.value,
                        })
                    }
                    className="w-24"
                />
            </TableCell>
            <TableCell>
                <Input
                    type="number"
                    value={page.counts}
                    onChange={(e) =>
                        updateDot(index, {
                            counts: Number(e.target.value),
                        })
                    }
                    className="w-24"
                />
            </TableCell>
            <TableCell>
                <Select
                    value={page.side.toString()}
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
                        <SelectItem value="1">Side 1</SelectItem>
                        <SelectItem value="2">Side 2</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell>
                <div className="flex items-center space-x-2">
                    <Input
                        type="number"
                        value={page.sideToSide.stepOffset}
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
                        value={page.sideToSide.stepOffsetDirection}
                        onValueChange={(value) =>
                            updateSideToSide(
                                index,
                                'stepOffsetDirection',
                                value as 'Inside' | 'Outside',
                            )
                        }
                    >
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder="Direction" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Inside">Inside</SelectItem>
                            <SelectItem value="Outside">Outside</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="number"
                        value={page.sideToSide.yardline}
                        onChange={(e) =>
                            updateSideToSide(index, 'yardline', e.target.value)
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
                        value={page.frontToBack.stepOffset}
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
                        value={page.frontToBack.stepOffsetDirection}
                        onValueChange={(value) =>
                            updateFrontToBack(
                                index,
                                'stepOffsetDirection',
                                value as 'In Front Of' | 'Behind',
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
                            <SelectItem value="Behind">Behind</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={page.frontToBack.line}
                        onValueChange={(value) =>
                            updateFrontToBack(index, 'line', value as FrontBack)
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
    );
};
