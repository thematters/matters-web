/**
 * 金句卡片的風格與尺寸設定。
 *
 * 配色採「博物館金句牆」的淡彩便利貼色系（mashbean/seven-day-book-landing
 * museum/memo-wall），讓站內外的金句視覺一致。文字統一用暖墨 #2a2622，
 * 每色另配一個加深的點綴色（引號、作者、交疊圓浮水印）。
 * 金句字體為昭源宋體 Chiron Sung HK（見 styles.module.css 的 @font-face）。
 */

export type QuoteStyle = {
  id: string
  name: string // i18n key 後綴，對應 lang 檔的 styleXxx
  swatch: string // 風格選擇器上的色塊
  bg: string
  quoteColor: string
  accent: string // 引號、作者、浮水印
  sub: string // 次要文字
  /** QR Code 顏色（白底深碼） */
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
    id: 'sakura',
    name: 'Sakura',
    swatch: '#fbd7e2',
    bg: '#fbd7e2',
    quoteColor: '#2a2622',
    accent: '#c75d80',
    sub: '#9a6b7a',
    qrDark: '#2a2622',
    qrLight: '#ffffff',
  },
  {
    id: 'mist',
    name: 'Mist',
    swatch: '#d4eaf6',
    bg: '#d4eaf6',
    quoteColor: '#2a2622',
    accent: '#1999d0',
    sub: '#5a7d92',
    qrDark: '#2a2622',
    qrLight: '#ffffff',
  },
  {
    id: 'cream',
    name: 'Cream',
    swatch: '#fbf0c4',
    bg: '#fbf0c4',
    quoteColor: '#2a2622',
    accent: '#b58a00',
    sub: '#8a7a4e',
    qrDark: '#2a2622',
    qrLight: '#ffffff',
  },
  {
    id: 'meadow',
    name: 'Meadow',
    swatch: '#dff0d0',
    bg: '#dff0d0',
    quoteColor: '#2a2622',
    accent: '#5d8a3e',
    sub: '#6a7d5a',
    qrDark: '#2a2622',
    qrLight: '#ffffff',
  },
  {
    id: 'lilac',
    name: 'Lilac',
    swatch: '#e7e0fa',
    bg: '#e7e0fa',
    quoteColor: '#2a2622',
    accent: '#6e57ab',
    sub: '#7a6f95',
    qrDark: '#2a2622',
    qrLight: '#ffffff',
  },
]

export const QUOTE_SIZES: QuoteSize[] = [
  { id: 'square', name: 'Square', w: 1080, h: 1080 },
  { id: 'portrait', name: 'Portrait', w: 1080, h: 1350 },
]

/** 金句字數上限（超過自動截斷，金句以精煉為佳） */
export const MAX_QUOTE_LEN = 80

/**
 * 金句固定字級（1080px 設計尺寸）。不隨字數縮放，調性一致；
 * 此值讓 80 字（上限）也能完整塞進安全區、不壓到頁尾。
 */
export const QUOTE_FONT_SIZE = 54

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
