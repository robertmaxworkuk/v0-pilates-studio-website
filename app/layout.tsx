import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemePreferenceSync } from '@/components/global/theme-preference-sync'
import { Toaster } from '@/components/ui/sonner'
import { createClient } from '@/lib/supabase/server'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userPreferredTheme: 'light' | 'dark' | 'system' | null = null

  if (user) {
    const { data } = await supabase
      .from('users_profile')
      .select('theme_preference')
      .eq('id', user.id)
      .single()

    if (
      data?.theme_preference === 'light' ||
      data?.theme_preference === 'dark' ||
      data?.theme_preference === 'system'
    ) {
      userPreferredTheme = data.theme_preference
    }
  }

  const initialTheme = userPreferredTheme ?? 'light'

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme={initialTheme}
          enableSystem
          disableTransitionOnChange
        >
          <ThemePreferenceSync preferredTheme={userPreferredTheme} />
          {children}
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
