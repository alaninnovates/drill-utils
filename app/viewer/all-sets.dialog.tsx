import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useDrillStore } from '@/lib/state/drill-store-provider';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { dotData2025 } from '@/lib/dot/data';

export const AllSetsDialog = ({
    trigger,
    currentIndex,
    onSetSelect,
    labelOfInterest,
}: {
    trigger: React.ReactNode;
    currentIndex: number;
    onSetSelect?: (index: number) => void;
    labelOfInterest: string;
}) => {
    const pages = dotData2025[labelOfInterest].dots;
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="min-w-full max-h-[80vh] overflow-y-auto">
                <VisuallyHidden>
                    <DialogTitle>All Sets</DialogTitle>
                </VisuallyHidden>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">Movement</TableHead>
                            <TableHead className="w-24">Set</TableHead>
                            <TableHead className="w-24">Counts</TableHead>
                            <TableHead>Side to Side</TableHead>
                            <TableHead>Front to Back</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.map((page, index) => (
                            <TableRow
                                key={index}
                                className={
                                    index === currentIndex
                                        ? 'bg-primary/10'
                                        : ''
                                }
                                onClick={() =>
                                    onSetSelect && onSetSelect(index)
                                }
                                style={{
                                    cursor: onSetSelect ? 'pointer' : 'default',
                                }}
                            >
                                <TableCell className="font-medium">
                                    {page.movement}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {page.set}
                                </TableCell>
                                <TableCell>{page.counts}</TableCell>
                                <TableCell>
                                    Side {page.side}:{' '}
                                    {page.sideToSide.stepOffset}{' '}
                                    {page.sideToSide.stepOffsetDirection}{' '}
                                    {page.sideToSide.yardline} yd ln
                                </TableCell>
                                <TableCell>
                                    {page.frontToBack.stepOffset}{' '}
                                    {page.frontToBack.stepOffsetDirection}{' '}
                                    {page.frontToBack.line}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
};
