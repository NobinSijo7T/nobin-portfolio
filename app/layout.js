import { Analytics } from '@vercel/analytics/react';
import '@/assets/globals.scss';
import commonConfig from '@/database/config/metadata.json';
import LenisScroller from '@/components/UI/LenisScroller/LenisScroller';
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import CustomCursor from "@/components/UI/Elements/CustomCursor/CustomCursor";
import AudioPlayerWrapper from '@/components/UI/Elements/AudioPlayer/AudioPlayerWrapper';

// Temporary workaround for Turbopack font loading issue
// Using CSS imports instead of next/font/google

export const metadata = {
    title: commonConfig.metadata.title,
    description: commonConfig.metadata.description,
    icons: {
        icon: { url: '/icon-512.png', type: 'image/png' },
        apple: { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    }
}

export const viewport = {
    themeColor: '#FFD600',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({children}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body>
        <AudioPlayerWrapper>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
            <CustomCursor/>
            <LenisScroller/>
        </AudioPlayerWrapper>
        <Analytics/>

        </body>
        </html>
    )
}

