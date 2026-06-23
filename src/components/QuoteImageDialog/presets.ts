/**
 * 金句卡片的風格與尺寸設定。
 *
 * 配色採「低飽和、書卷氣」的編輯感色調（非 design-system 的 UI token）。
 * 取捨原因：design-system 的 canonical 品牌色（紫 #7258FF + 螢光綠 #C3F432）
 * 是給 App 介面用的強訊號色，放大成滿版金句底色會過於吵雜；Matters 官方金句卡
 * （matters-town-quote-square）本身也走暗色氛圍 + 暖金的沉穩路線。
 * 品牌識別改由頁尾的「Matters」字標承擔（見 Card.tsx），不靠滿版品牌色。
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
  /** 深底用 white 版字標 / 七日書 logo，淺底用 dark 版 */
  logo?: 'dark' | 'white'
}

export type QuoteSize = {
  id: string
  name: string // i18n key 後綴
  w: number
  h: number
}

export const QUOTE_STYLES: QuoteStyle[] = [
  {
    id: 'paper',
    name: 'Paper',
    swatch: '#a6814c',
    bg: '#f6f2e9',
    quoteColor: '#2c2a26',
    accent: '#a6814c',
    sub: '#8a7a5e',
    font: 'serif',
    logo: 'dark',
  },
  {
    id: 'ink',
    name: 'Ink',
    swatch: '#1c1b19',
    bg: '#1c1b19',
    quoteColor: '#f2eee5',
    accent: '#c7a669',
    sub: '#9a9183',
    font: 'serif',
    wide: true,
    logo: 'white',
  },
  {
    id: 'sage',
    name: 'Sage',
    swatch: '#44574e',
    bg: '#44574e',
    quoteColor: '#f0ece1',
    accent: '#cbb680',
    sub: '#c2ccc4',
    font: 'serif',
    logo: 'white',
  },
  {
    id: 'clay',
    name: 'Clay',
    swatch: '#b06a4f',
    bg: '#e3cfc2',
    quoteColor: '#463a33',
    accent: '#b06a4f',
    sub: '#8e6a57',
    font: 'serif',
    logo: 'dark',
  },
]

export const QUOTE_SIZES: QuoteSize[] = [
  { id: 'square', name: 'Square', w: 1080, h: 1080 },
  { id: 'portrait', name: 'Portrait', w: 1080, h: 1350 },
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
    return {
      text: text.slice(0, MAX_QUOTE_LEN) + '…',
      truncated: true,
      original: text.length,
    }
  }
  return { text, truncated: false, original: text.length }
}
