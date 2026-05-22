'use client';

import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';

export default function AnalyticsWrapper() {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // Only render Analytics in production or if explicitly enabled
        if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV) {
            setShouldRender(true);
        }
    }, []);

    if (!shouldRender) return null;

    return <Analytics />;
}
