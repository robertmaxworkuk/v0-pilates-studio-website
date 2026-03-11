/**
 * Format price with Russian locale
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Format price without currency symbol
 */
export function formatPriceShort(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price)
}

/**
 * Calculate savings percentage for subscriptions
 */
export function calculateSavings(regularPrice: number, subscriptionPrice: number, sessions: number): number {
  const totalRegular = regularPrice * sessions
  const savings = ((totalRegular - subscriptionPrice) / totalRegular) * 100
  return Math.round(savings)
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  
  if (digits.length === 11 && digits.startsWith('7')) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
  }
  
  return phone
}

/**
 * Format working hours
 */
export function formatWorkingHours(hours: { open: string; close: string }): string {
  return `${hours.open} – ${hours.close}`
}
