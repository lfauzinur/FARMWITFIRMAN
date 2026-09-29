export function getLocalizedData<T extends Record<string, any>>(
  item: T,
  locale: string,
  fields: (keyof T)[]
): any {
  const localizedItem = { ...item };
  
  for (const field of fields) {
    if (item[field] && typeof item[field] === 'object' && item[field][locale]) {
      localizedItem[field] = item[field][locale];
    }
  }
  
  return localizedItem;
}

export function formatDate(dateString: string, locale: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', options);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
