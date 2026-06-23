import { forwardRef } from 'react'

import IconMattersLogo from '@/public/static/icons/logo.svg'
import SevenDayBookLogoDark from '@/public/static/images/seven-day-book-logo-dark.svg'
import SevenDayBookLogoWhite from '@/public/static/images/seven-day-book-logo-white.svg'

import {
  clampQuote,
  fitFontSize,
  type QuoteSize,
  type QuoteStyle,
} from './presets'
import styles from './styles.module.css'

const FONT_SERIF = "'Noto Serif TC','Songti TC','Songti SC','NSimSun',serif"
const FONT_SANS =
  "'PingFang TC','PingFang SC','Microsoft JhengHei','Noto Sans TC',sans-serif"

export type QuoteCardProps = {
  quote: string
  author: string
  title: string
  style: QuoteStyle
  size: QuoteSize
  isSevenDayBook: boolean
}

/**
 * 金句卡片本體。固定以 1080px 寬度渲染（size.w/size.h），
 * 由 Content 以 CSS transform 縮放預覽、以 html-to-image 原尺寸截圖。
 * 品牌識別靠頁尾的「Matters」字標（七日書文章改用七日書 logo）。
 */
export const QuoteCard = forwardRef<HTMLDivElement, QuoteCardProps>(
  ({ quote, author, title, style: s, size, isSevenDayBook }, ref) => {
    const { text } = clampQuote(quote)
    const fontFamily = s.font === 'serif' ? FONT_SERIF : FONT_SANS
    const letterSpacing = s.wide
      ? '0.06em'
      : s.font === 'serif'
        ? '0.02em'
        : 'normal'
    const lineHeight = s.airy ? 1.8 : 1.65
    const fontSize = fitFontSize(text.length, s.airy)

    const SevenDayBookLogo =
      s.logo === 'white' ? SevenDayBookLogoWhite : SevenDayBookLogoDark

    return (
      <div
        ref={ref}
        className={styles.card}
        style={{ width: size.w, height: size.h, background: s.bg, fontFamily }}
      >
        <div className={styles.inner}>
          <div className={styles.mark} style={{ color: s.accent }}>
            “
          </div>
          <div
            className={styles.quote}
            style={{
              fontSize,
              lineHeight,
              color: s.quoteColor,
              fontWeight: s.weight || 400,
              letterSpacing,
            }}
          >
            {text}
          </div>
          <div className={styles.author} style={{ color: s.accent }}>
            <span className={styles.dash}>—</span>
            {author}
          </div>
        </div>

        <div className={styles.foot}>
          <div className={styles.title} style={{ color: s.sub }}>
            <span className={styles.label}>原文</span>
            {title}
          </div>
          {isSevenDayBook ? (
            <div className={styles.brandLogo}>
              <SevenDayBookLogo />
            </div>
          ) : (
            <div className={styles.wordmark} style={{ color: s.quoteColor }}>
              <IconMattersLogo />
            </div>
          )}
        </div>
      </div>
    )
  }
)

QuoteCard.displayName = 'QuoteCard'
