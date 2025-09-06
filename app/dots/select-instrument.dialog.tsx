import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
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
                    <Button onClick={() => onSelect('C1')}>C1</Button>
                    <Button onClick={() => onSelect('C2')}>C2</Button>
                    <Button onClick={() => onSelect('C3')}>C3</Button>
                    <Button onClick={() => onSelect('W1')}>W1</Button>
                    <Button onClick={() => onSelect('W2')}>W2</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
