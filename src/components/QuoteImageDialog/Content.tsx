import { toJpeg } from 'html-to-image'
import QRCode from 'qrcode'
import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import { Dialog, ShareDialog, toast, useMutation } from '~/components'
import { PUT_QUOTE } from '~/components/GQL/mutations/putQuote'
import { PutQuoteMutation } from '~/gql/graphql'

import { QuoteCard } from './Card'
import Complete from './Complete'
import { QuoteWallCampaign } from './gql'
import { clampQuote, MAX_QUOTE_LEN, QUOTE_SIZES, QUOTE_STYLES } from './presets'
import styles from './styles.module.css'

const PREVIEW_WIDTH = 320 // 預覽寬度（卡片以此等比縮放顯示）

const styleNames = defineMessages({
  warm: { defaultMessage: 'Cream', id: 'lY48xg' },
  pine: { defaultMessage: 'Pine', id: 'K3+ihp' },
  mint: { defaultMessage: 'Mint', id: 'OwO+Nr' },
  espresso: { defaultMessage: 'Espresso', id: 'zecq9n' },
})
const sizeNames = defineMessages({
  square: { defaultMessage: 'Square 1:1', id: 'iII6Ry' },
  portrait: { defaultMessage: 'Portrait 4:5', id: 'em7860' },
})
const sizeNotes = defineMessages({
  square: { defaultMessage: 'IG / FB post', id: 'A6dqhl' },
  portrait: { defaultMessage: 'IG post · most eye-catching', id: 'Oawtbo' },
})

export type QuoteImageDialogContentProps = {
  closeDialog: () => void
  quote: string
  author: string
  title: string
  /** 文章連結，用於產生 QR Code */
  shareLink: string
  isSevenDayBook: boolean
  /** 文章 id；與 canPostToWall 一起提供時顯示「上牆」按鈕 */
  articleId?: string
  /** 文章屬於活動（campaign）才可上牆；伺服器端會再驗證 */
  canPostToWall?: boolean
  /** 上牆的活動（開啟金句牆者）；上牆成功後導回活動頁 */
  campaign?: QuoteWallCampaign | null
}

const QuoteImageDialogContent: React.FC<QuoteImageDialogContentProps> = ({
  closeDialog,
  quote,
  author,
  title,
  shareLink,
  isSevenDayBook,
  articleId,
  canPostToWall,
  campaign,
}) => {
  const intl = useIntl()
  const cardRef = useRef<HTMLDivElement>(null)

  const [styleId, setStyleId] = useState('warm')
  const [sizeId, setSizeId] = useState('portrait')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [putQuote] = useMutation<PutQuoteMutation>(PUT_QUOTE)
  const [isPosting, setPosting] = useState(false)
  const [posted, setPosted] = useState(false)

  const style = QUOTE_STYLES.find((s) => s.id === styleId) || QUOTE_STYLES[0]
  const size = QUOTE_SIZES.find((s) => s.id === sizeId) || QUOTE_SIZES[1]
  const { truncated, original } = useMemo(() => clampQuote(quote), [quote])

  // 依風格 / 連結重新產生 QR Code（顏色跟著風格走）
  useEffect(() => {
    let active = true
    QRCode.toDataURL(shareLink || ' ', {
      margin: 0,
      width: 300,
      color: { dark: style.qrDark, light: style.qrLight },
    })
      .then((url) => active && setQrDataUrl(url))
      .catch(() => active && setQrDataUrl(''))
    return () => {
      active = false
    }
  }, [shareLink, style.qrDark, style.qrLight])

  const previewScale = PREVIEW_WIDTH / size.w

  const generate = async () => {
    if (!cardRef.current) return null
    // 截圖前確保金句字體（昭源宋體子集）已載入，避免 fallback
    try {
      await document.fonts.load(
        `400 80px 'Chiron Sung HK'`,
        `${quote}${author}`
      )
      await document.fonts.ready
    } catch {
      // 字體載入失敗則以系統襯線 fallback 輸出
    }
    return toJpeg(cardRef.current, {
      quality: 0.95,
      pixelRatio: 2,
      width: size.w,
      height: size.h,
      style: { transform: 'none' },
    })
  }

  const onDownload = async () => {
    const url = await generate()
    if (!url) return
    analytics.trackEvent('click_button', {
      type: 'quote_image_download',
      pageType: 'article_detail',
    })
    const a = document.createElement('a')
    a.href = url
    a.download = `matters-quote-${style.id}-${size.id}.jpg`
    a.click()
  }

  const onPostToWall = async () => {
    if (!articleId || isPosting || posted) return
    setPosting(true)
    analytics.trackEvent('click_button', {
      type: 'quote_post_to_wall',
      pageType: 'article_detail',
    })

    // wall stores plain text (no trailing ellipsis — the server verifies the
    // quote is an excerpt of the article)
    const wallText = (quote || '')
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, MAX_QUOTE_LEN)

    try {
      await putQuote({
        variables: { input: { articleId, content: wallText } },
      })
      // 上牆成功後切換到成功頁（含「前往活動頁」），取代原本的 toast
      setPosted(true)
    } catch {
      // 每日／同篇上限已於 matters-server#4867 移除，其餘失敗顯示通用訊息
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Failed to post to the wall"
            id="5IlTNw"
          />
        ),
      })
    } finally {
      setPosting(false)
    }
  }

  const onShareClick = () => {
    analytics.trackEvent('click_button', {
      type: 'quote_image_share',
      pageType: 'article_detail',
    })
  }

  // 上牆成功後改顯示成功頁（打勾 +「前往活動頁」）
  if (posted) {
    return <Complete campaign={campaign} closeDialog={closeDialog} />
  }

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Share Quote" id="1DQn89" />}
        closeDialog={closeDialog}
      />

      <Dialog.Content>
        <section className={styles.preview}>
          <div
            className={styles.stage}
            style={{
              width: size.w * previewScale,
              height: size.h * previewScale,
              transform: `scale(${previewScale})`,
            }}
          >
            <QuoteCard
              ref={cardRef}
              quote={quote}
              author={author}
              title={title}
              qrDataUrl={qrDataUrl}
              style={style}
              size={size}
              isSevenDayBook={isSevenDayBook}
            />
          </div>
        </section>

        {truncated && (
          <p className={styles.truncHint}>
            <FormattedMessage
              defaultMessage="You selected {original} characters; only the first {max} are shown. A concise quote works best."
              id="e4AtHq"
              values={{ original, max: MAX_QUOTE_LEN }}
            />
          </p>
        )}

        <section className={styles.group}>
          <span className={styles.groupLabel}>
            <FormattedMessage defaultMessage="Style" id="7mL9QE" />
          </span>
          <div className={styles.opts}>
            {QUOTE_STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${styles.opt} ${s.id === styleId ? styles.active : ''}`}
                onClick={() => setStyleId(s.id)}
              >
                <span
                  className={styles.swatch}
                  style={{ background: s.swatch }}
                />
                {intl.formatMessage(
                  styleNames[s.id as keyof typeof styleNames]
                )}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.group}>
          <span className={styles.groupLabel}>
            <FormattedMessage defaultMessage="Size" id="agOXPD" />
          </span>
          <div className={styles.opts}>
            {QUOTE_SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${styles.opt} ${s.id === sizeId ? styles.active : ''}`}
                onClick={() => setSizeId(s.id)}
              >
                <span className={styles.sizeName}>
                  {intl.formatMessage(
                    sizeNames[s.id as keyof typeof sizeNames]
                  )}
                  <span className={styles.sizeNote}>
                    {intl.formatMessage(
                      sizeNotes[s.id as keyof typeof sizeNotes]
                    )}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            {articleId && canPostToWall && (
              <Dialog.RoundedButton
                text={
                  <FormattedMessage defaultMessage="Post to wall" id="oCQmLu" />
                }
                color="green"
                loading={isPosting}
                disabled={isPosting}
                onClick={onPostToWall}
              />
            )}
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Download" id="5q3qC0" />}
              color="green"
              onClick={onDownload}
            />
            <ShareDialog title={title}>
              {({ openDialog }) => (
                <Dialog.RoundedButton
                  text={
                    <FormattedMessage defaultMessage="Share" id="OKhRC6" />
                  }
                  color="green"
                  onClick={() => {
                    onShareClick()
                    openDialog()
                  }}
                />
              )}
            </ShareDialog>
          </>
        }
        smUpBtns={
          <>
            {articleId && canPostToWall && (
              <Dialog.TextButton
                text={
                  <FormattedMessage defaultMessage="Post to wall" id="oCQmLu" />
                }
                color="green"
                loading={isPosting}
                disabled={isPosting}
                onClick={onPostToWall}
              />
            )}
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Download" id="5q3qC0" />}
              color="green"
              onClick={onDownload}
            />
            <ShareDialog title={title}>
              {({ openDialog }) => (
                <Dialog.TextButton
                  text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
                  color="green"
                  onClick={() => {
                    onShareClick()
                    openDialog()
                  }}
                />
              )}
            </ShareDialog>
          </>
        }
      />
    </>
  )
}

export default QuoteImageDialogContent
