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
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {['C1', 'C2', 'C3', 'W1', 'W2'].map((inst) => (
                        <DialogClose asChild key={inst}>
                            <Button onClick={() => onSelect(inst)}>
                                {inst}
                            </Button>
                        </DialogClose>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};
