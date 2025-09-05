import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold">Welcome ig</h1>
            <Link href="/import">
                <Button>Import dots</Button>
            </Link>
            <Link href="/viewer">
                <Button>Go to viewer</Button>
            </Link>
        </div>
    );
}
