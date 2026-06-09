/**
 * 金句卡片的風格與尺寸設定。
 * 顏色取自 thematters/design-system token；命名採中性色調。
 */

export type QuoteStyle = {
  id: string
  name: string // i18n key 後綴，對應 lang 檔的 styleXxx
  swatch: string // 風格選擇器上的色塊
  bg: string
  quoteColor: string
  accent: string
  sub: string
  font: 'serif' | 'sans'
  weight?: number
  airy?: boolean
  wide?: boolean
  /** 七日書 logo 版本：深底用 white，淺底用 dark */
  logo?: 'dark' | 'white'
  qrDark: string
  qrLight: string
}

export type QuoteSize = {
  id: string
  name: string // i18n key 後綴
  w: number
  h: number
}

export const QUOTE_STYLES: QuoteStyle[] = [
  { id: 'warm',    name: 'Cream',   swatch: '#c0a46b', bg: '#faf7f0', quoteColor: '#333333', accent: '#c0a46b', sub: '#c58463', font: 'serif', logo: 'dark',  qrDark: '#c0a46b', qrLight: '#faf7f0' },
  { id: 'sky',     name: 'Sky',     swatch: '#85d8ff', bg: '#F0F9FE', quoteColor: '#045898', accent: '#1999D0', sub: '#1999D0', font: 'sans', weight: 300, airy: true, logo: 'dark', qrDark: '#1999D0', qrLight: '#F0F9FE' },
  { id: 'coral',   name: 'Coral',   swatch: '#dc7871', bg: '#ffe8e8', quoteColor: '#333333', accent: '#dc7871', sub: '#d577aa', font: 'sans', weight: 600, logo: 'dark', qrDark: '#dc7871', qrLight: '#ffe8e8' },
  { id: 'ink',     name: 'Ink',     swatch: '#000000', bg: '#000000', quoteColor: '#ffffff', accent: '#c0a46b', sub: '#c0a46b', font: 'serif', wide: true, logo: 'white', qrDark: '#c0a46b', qrLight: '#000000' },
  { id: 'pine',    name: 'Pine',    swatch: '#0d6763', bg: '#0d6763', quoteColor: '#faf7f0', accent: '#40bfa5', sub: '#a9d9cf', font: 'serif', logo: 'white', qrDark: '#faf7f0', qrLight: '#0d6763' },
  { id: 'mint',    name: 'Mint',    swatch: '#70b388', bg: 'linear-gradient(160deg,#f2faf7 0%,#f2fbd9 100%)', quoteColor: '#246802', accent: '#70b388', sub: '#70b388', font: 'serif', logo: 'dark', qrDark: '#246802', qrLight: '#f7fbef' },
  { id: 'violet',  name: 'Violet',  swatch: '#5a43e5', bg: '#5a43e5', quoteColor: '#f5f3ff', accent: '#b9aef4', sub: '#d5cffe', font: 'sans', weight: 500, logo: 'white', qrDark: '#f5f3ff', qrLight: '#5a43e5' },
  { id: 'slate',   name: 'Slate',   swatch: '#9a9aa0', bg: '#f4f4f5', quoteColor: '#2b2b2e', accent: '#9a9aa0', sub: '#8c8c92', font: 'sans', weight: 400, logo: 'dark', qrDark: '#333333', qrLight: '#f4f4f5' },
]

export const QUOTE_SIZES: QuoteSize[] = [
  { id: 'square',   name: 'Square',   w: 1080, h: 1080 },
  { id: 'portrait', name: 'Portrait', w: 1080, h: 1350 },
  { id: 'story',    name: 'Story',    w: 1080, h: 1920 },
]

/** 金句字數上限（超過自動截斷，金句以精煉為佳） */
export const MAX_QUOTE_LEN = 80

/** 依字數自動縮放字級，確保長句也塞得進安全區、不壓到頁尾 */
export const fitFontSize = (len: number, airy?: boolean): number => {
  if (len <= 16) return airy ? 72 : 78
  if (len <= 30) return airy ? 60 : 66
  if (len <= 48) return 56
  if (len <= 64) return 48
  return 42
}

export const clampQuote = (raw: string) => {
  const text = (raw || '').trim().replace(/\s+/g, ' ')
  if (text.length > MAX_QUOTE_LEN) {
    return { text: text.slice(0, MAX_QUOTE_LEN) + '…', truncated: true, original: text.length }
  }
  return { text, truncated: false, original: text.length }
}
