import { forwardRef } from 'react'

import MattersLetteringBlack from '@/public/static/images/matters-lettering-black.svg'
import MattersLetteringWhite from '@/public/static/images/matters-lettering-white.svg'
import SevenDayBookLogoDark from '@/public/static/images/seven-day-book-logo-dark.svg'
import SevenDayBookLogoWhite from '@/public/static/images/seven-day-book-logo-white.svg'

import {
  clampQuote,
  fitFontSize,
  type QuoteSize,
  type QuoteStyle,
} from './presets'
import styles from './styles.module.css'

const FONT_SERIF =
  "'Chiron Sung HK','Noto Serif TC','Songti TC','Songti SC','NSimSun',serif"

export type QuoteCardProps = {
  quote: string
  author: string
  title: string
  /** QR Code 的 data URL（由 Content 以 qrcode 產生） */
  qrDataUrl: string
  style: QuoteStyle
  size: QuoteSize
  isSevenDayBook: boolean
}

/**
 * 金句卡片本體。固定以 1080px 寬度渲染（size.w/size.h），
 * 由 Content 以 CSS transform 縮放預覽、以 html-to-image 原尺寸截圖。
 *
 * 版面：上引號 → 金句（昭源宋體）→ 下引號 → 作者 → 頁尾（標題 + logo、QR）。
 * logo 依文章來源：七日書用七日書 logo，其餘用官方 Matters 字標。
 */
export const QuoteCard = forwardRef<HTMLDivElement, QuoteCardProps>(
  (
    { quote, author, title, qrDataUrl, style: s, size, isSevenDayBook },
    ref
  ) => {
    const { text } = clampQuote(quote)
    const fontSize = fitFontSize(text.length, size.h > size.w)

    const SevenDayBookLogo =
      s.logo === 'white' ? SevenDayBookLogoWhite : SevenDayBookLogoDark
    const MattersLettering =
      s.logo === 'white' ? MattersLetteringWhite : MattersLetteringBlack

    return (
      <div
        ref={ref}
        className={`${styles.card} ${size.h > size.w ? styles.portrait : ''}`}
        style={{
          width: size.w,
          height: size.h,
          background: s.bg,
          fontFamily: FONT_SERIF,
        }}
      >
        <div className={styles.inner}>
          <div className={styles.mark} style={{ color: s.accent }}>
            “
          </div>
          <div
            className={styles.quote}
            style={{ fontSize, color: s.quoteColor }}
          >
            {text}
          </div>
          {/* 下引號：用上引號同字符水平鏡射，確保與上引號左右對稱 */}
          <div className={styles.markClose} style={{ color: s.accent }}>
            “
          </div>
          <div className={styles.author} style={{ color: s.accent }}>
            <span className={styles.dash}>—</span>
            {author}
          </div>
          <div className={styles.title} style={{ color: s.sub }}>
            〈{title}〉
          </div>
        </div>

        <div className={styles.foot}>
          {isSevenDayBook ? (
            <div className={styles.brandLogo}>
              <SevenDayBookLogo />
            </div>
          ) : (
            <div className={styles.wordmark}>
              <MattersLettering />
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
