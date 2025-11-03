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
        <div className="absolute top-4 right-4">
            <Button onClick={handleLogout} variant="outline">
                Logout
            </Button>
        </div>
    );
}
