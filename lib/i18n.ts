export const locales = ['es','en'] as const;
export type Locale = typeof locales[number];

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('./dictionaries/en')).dictionary;
    default:
      return (await import('./dictionaries/es')).dictionary;
  }
}
