'use client'

import { studioInfo } from '@/lib/data/studio'
import { formatPhone } from '@/lib/format'
import { BrandLogo } from '@/components/shared/brand-logo'

const navLinks = [
  { label: 'О тренере', href: '#about' },
  { label: 'Методика', href: '#method' },
  { label: 'Программы', href: '#programs' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <BrandLogo light />
              </div>
              <p className="max-w-md text-zinc-300 leading-relaxed">
                Персональные и групповые занятия пилатесом для здоровья, 
                красоты и гармонии тела и духа.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-zinc-300 hover:text-zinc-50 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-zinc-300">
                <li>
                  <a 
                    href={`tel:${studioInfo.phone}`}
                    className="hover:text-zinc-50 transition-colors"
                  >
                    {formatPhone(studioInfo.phone)}
                  </a>
                </li>
                <li>
                  <a 
                    href={`mailto:${studioInfo.email}`}
                    className="hover:text-zinc-50 transition-colors"
                  >
                    {studioInfo.email}
                  </a>
                </li>
                <li className="pt-2">
                  {studioInfo.address}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-zinc-400">
              {currentYear} Pilatta. Все права защищены.
            </p>
            <div className="flex gap-6">
              {studioInfo.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
