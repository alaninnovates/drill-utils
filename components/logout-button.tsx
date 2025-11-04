'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <div className="absolute top-8 left-8">
            <Button
                onClick={handleLogout}
                className="border-destructive text-destructive border-2 bg-white"
            >
                Logout
            </Button>
        </div>
    );
}
