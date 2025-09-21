import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { instrumentToColor } from '@/lib/dot/color';
import { dotData2025 } from '@/lib/dot/data';

export const SelectInstrumentDialog = ({
    trigger,
    onSelect,
}: {
    trigger: React.ReactNode;
    onSelect: (instrument: string) => void;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Instrument</DialogTitle>
                    <DialogDescription>
                        Select the instrument you want to use for this drill.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mt-4 max-h-64 overflow-y-auto">
                    {Object.values(dotData2025)
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map(({ id, performer, label }) => (
                            <DialogClose asChild key={id}>
                                <Button
                                    onClick={() => onSelect(label)}
                                    style={{
                                        backgroundColor:
                                            instrumentToColor(performer),
                                    }}
                                >
                                    {performer} {label}
                                </Button>
                            </DialogClose>
                        ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
