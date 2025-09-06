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
}: {
    trigger: React.ReactNode;
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
                    <Button>a</Button>
                    <Button>b</Button>
                    <Button>c</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
