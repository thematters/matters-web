import { forwardRef } from 'react'

import IconMattersLogo from '@/public/static/icons/logo.svg'
import SevenDayBookLogo from '@/public/static/images/seven-day-book-logo-dark.svg'

import {
  clampQuote,
  QUOTE_FONT_SIZE,
  type QuoteSize,
  type QuoteStyle,
} from './presets'
import styles from './styles.module.css'

const FONT_SERIF =
  "'Chiron Sung HK','Noto Serif TC','Songti TC','Songti SC','NSimSun',serif"
const FONT_SANS =
  "'PingFang TC','PingFang SC','Microsoft JhengHei','Noto Sans TC',sans-serif"

export type QuoteCardProps = {
  quote: string
  author: string
  /** 文章 QR Code 的 data URL（由 Content 產生，掃描回原文） */
  qrDataUrl: string
  style: QuoteStyle
  size: QuoteSize
  isSevenDayBook: boolean
}

/**
 * 金句卡片本體。固定以 1080px 寬度渲染（size.w/size.h），
 * 由 Content 以 CSS transform 縮放預覽、以 html-to-image 原尺寸截圖。
 *
 * 版面：交疊圓浮水印（右上）→ 引號 → 金句（昭源宋體、固定字級）→ 作者（黑體）
 *      → 頁尾左下 logo（一般文章＝Matters 字標／七日書＝七日書 logo）、右下 QR。
 */
export const QuoteCard = forwardRef<HTMLDivElement, QuoteCardProps>(
  ({ quote, author, qrDataUrl, style: s, size, isSevenDayBook }, ref) => {
    const { text } = clampQuote(quote)

    return (
      <div
        ref={ref}
        className={styles.card}
        style={{
          width: size.w,
          height: size.h,
          background: s.bg,
          fontFamily: FONT_SERIF,
        }}
      >
        {/* Matters 交疊圓浮水印 */}
        <svg
          className={styles.watermark}
          viewBox="0 0 385 265"
          style={{ color: s.accent }}
          aria-hidden="true"
        >
          <circle cx="132.92" cy="132.5" r="132.5" fill="currentColor" />
          <circle cx="265.83" cy="132.5" r="119.25" fill="currentColor" />
        </svg>

        <div className={styles.inner}>
          <div className={styles.mark} style={{ color: s.accent }}>
            “
          </div>
          <div
            className={styles.quote}
            style={{ fontSize: QUOTE_FONT_SIZE, color: s.quoteColor }}
          >
            {text}
          </div>
          <div
            className={styles.author}
            style={{ color: s.accent, fontFamily: FONT_SANS }}
          >
            <span className={styles.dash}>—</span>
            {author}
          </div>
        </div>

        <div className={styles.foot}>
          {isSevenDayBook ? (
            <div className={styles.brandLogo}>
              <SevenDayBookLogo />
            </div>
          ) : (
            <div className={styles.wordmark} style={{ color: s.quoteColor }}>
              <IconMattersLogo />
            </div>
          )}
          <div className={styles.qr} style={{ background: s.qrLight }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="QR code" />
          </div>
        </div>
      </div>
    )
  }
)

QuoteCard.displayName = 'QuoteCard'
