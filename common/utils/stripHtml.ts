/**
 * Remove html tag and merge multiple spaces into one.
 */
export const stripHtml = (value: string | null) =>
  (value || '').replace(/(<([^>]+)>)/gi, '').replace(/(&nbsp;| )+/gi, ' ')
