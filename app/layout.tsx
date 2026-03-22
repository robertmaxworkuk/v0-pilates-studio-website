import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pilatta | Студия пилатеса в Москве',
  description: 'Персональные и групповые занятия пилатесом с сертифицированным тренером. 15 лет опыта, индивидуальный подход. Запишитесь на пробное занятие.',
  keywords: ['пилатес', 'Pilatta', 'студия пилатеса', 'персональные тренировки', 'групповые занятия', 'Москва'],
  authors: [{ name: 'Pilatta' }],
  openGraph: {
    title: 'Pilatta | Студия пилатеса',
    description: 'Персональные и групповые занятия пилатесом с сертифицированным тренером',
    type: 'website',
    locale: 'ru_RU',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
