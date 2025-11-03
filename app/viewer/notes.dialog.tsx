import { DialogHeader } from '@/components/ui/dialog';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useDrillStore } from '@/lib/state/drill-store-provider';

export const NotesDialog = ({
    trigger,
    setName,
}: {
    trigger: React.ReactNode;
    setName: string;
}) => {
    const { modifyNote, pages } = useDrillStore((store) => store);
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Notes - S{setName}</DialogTitle>
                </DialogHeader>
                <Textarea
                    className="w-full"
                    rows={5}
                    defaultValue={
                        pages.find((p) => p.set === setName)?.note || ''
                    }
                    onChange={(e) => modifyNote(setName, e.target.value)}
                />
            </DialogContent>
        </Dialog>
    );
};
