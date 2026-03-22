import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pilatta | Студия пилатеса в Москве',
  description: 'Студия пилатеса Pilatta в Москве: персональные занятия, мини-группы, онлайн-тренировки и программы для беременных. Запишитесь на пробное занятие.',
  keywords: ['пилатес', 'Pilatta', 'студия пилатеса', 'персональные тренировки', 'групповые занятия', 'Москва'],
  authors: [{ name: 'Pilatta' }],
  openGraph: {
    title: 'Pilatta | Студия пилатеса',
    description: 'Pilatta — студия пилатеса в Москве с персональными занятиями, мини-группами, онлайн-тренировками и программами для беременных.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pilatta | Студия пилатеса',
    description: 'Pilatta — студия пилатеса в Москве с персональными занятиями, мини-группами, онлайн-тренировками и программами для беременных.',
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
