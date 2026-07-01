/**
 * 金句卡片的風格與尺寸設定。
 * 保留 ICU 原版 8 色中的 4 色（Cream / Coral / Ink / Slate）。
 * 金句字體統一為昭源宋體 Chiron Sung HK（見 styles.module.css 的 @font-face）。
 */

export type QuoteStyle = {
  id: string
  name: string // i18n key 後綴，對應 lang 檔的 styleXxx
  swatch: string // 風格選擇器上的色塊
  bg: string
  quoteColor: string
  accent: string // 引號、作者
  sub: string // 標題等次要文字
  /** logo / 字標版本：深底用 white、淺底用 dark */
  logo: 'dark' | 'white'
  /** QR Code 顏色 */
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
  {
    id: 'warm',
    name: 'Cream',
    swatch: '#c0a46b',
    bg: '#faf7f0',
    quoteColor: '#333333',
    accent: '#c0a46b',
    sub: '#c58463',
    logo: 'dark',
    qrDark: '#c0a46b',
    qrLight: '#faf7f0',
  },
  {
    id: 'pine',
    name: 'Pine',
    swatch: '#0d6763',
    bg: '#0d6763',
    quoteColor: '#faf7f0',
    accent: '#40bfa5',
    sub: '#a9d9cf',
    logo: 'white',
    qrDark: '#faf7f0',
    qrLight: '#0d6763',
  },
  {
    id: 'mint',
    name: 'Mint',
    swatch: '#70b388',
    bg: 'linear-gradient(160deg,#f2faf7 0%,#f2fbd9 100%)',
    quoteColor: '#246802',
    accent: '#70b388',
    sub: '#70b388',
    logo: 'dark',
    qrDark: '#246802',
    qrLight: '#f7fbef',
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    swatch: '#1f2023',
    bg: '#1f2023',
    quoteColor: '#f0f0f2',
    accent: '#b3b4ba',
    sub: '#83848a',
    logo: 'white',
    qrDark: '#f0f0f2',
    qrLight: '#1f2023',
  },
]

export const QUOTE_SIZES: QuoteSize[] = [
  { id: 'square', name: 'Square', w: 1080, h: 1080 },
  { id: 'portrait', name: 'Portrait', w: 1080, h: 1350 },
]

/** 金句字數上限（超過自動截斷，金句以精煉為佳） */
export const MAX_QUOTE_LEN = 80

/**
 * 依字數自動縮放字級，確保長句也塞得進安全區、不壓到頁尾。
 * 直式（4:5）較高、可用較大字級；方形（1:1）較矮，長句需縮小才塞得下。
 */
export const fitFontSize = (len: number, tall: boolean): number => {
  const sizes = tall ? [84, 74, 64, 56, 50] : [78, 68, 58, 48, 42]
  if (len <= 16) {
    return sizes[0]
  }
  if (len <= 30) {
    return sizes[1]
  }
  if (len <= 48) {
    return sizes[2]
  }
  if (len <= 64) {
    return sizes[3]
  }
  return sizes[4]
}

export const clampQuote = (raw: string) => {
  const text = (raw || '').trim().replace(/\s+/g, ' ')
  if (text.length > MAX_QUOTE_LEN) {
    return {
      text: text.slice(0, MAX_QUOTE_LEN) + '…',
      truncated: true,
      original: text.length,
    }
  }
  return { text, truncated: false, original: text.length }
}
