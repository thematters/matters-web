import { toJpeg } from 'html-to-image'
import QRCode from 'qrcode'
import { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import { analytics, isMobile } from '~/common/utils'
import { Dialog, toast, useMutation } from '~/components'
import { PUT_QUOTE } from '~/components/GQL/mutations/putQuote'
import { PutQuoteMutation } from '~/gql/graphql'

import { QuoteCard } from './Card'
import { clampQuote, MAX_QUOTE_LEN, QUOTE_SIZES, QUOTE_STYLES } from './presets'
import styles from './styles.module.css'

const PREVIEW_WIDTH = 320 // 預覽寬度（卡片以此等比縮放顯示）

const styleNames = defineMessages({
  warm: { defaultMessage: 'Cream', id: 'lY48xg' },
  sky: { defaultMessage: 'Sky', id: '/uJdnC' },
  coral: { defaultMessage: 'Coral', id: 'bGxO22' },
  ink: { defaultMessage: 'Ink', id: 'QWkEED' },
  pine: { defaultMessage: 'Pine', id: 'K3+ihp' },
  mint: { defaultMessage: 'Mint', id: 'OwO+Nr' },
  violet: { defaultMessage: 'Violet', id: '3cxMQp' },
  slate: { defaultMessage: 'Slate', id: 'iLKG5w' },
})
const sizeNames = defineMessages({
  square: { defaultMessage: 'Square 1:1', id: 'iII6Ry' },
  portrait: { defaultMessage: 'Portrait 4:5', id: 'em7860' },
  story: { defaultMessage: 'Story 9:16', id: 'CZciVV' },
})
const sizeNotes = defineMessages({
  square: { defaultMessage: 'IG / FB post', id: 'A6dqhl' },
  portrait: { defaultMessage: 'IG post · most eye-catching', id: 'Oawtbo' },
  story: { defaultMessage: 'IG / FB story · Threads', id: '6RAJ7U' },
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
}) => {
  const intl = useIntl()
  const cardRef = useRef<HTMLDivElement>(null)

  const [styleId, setStyleId] = useState('pine')
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
      setPosted(true)
      toast.info({
        message: (
          <FormattedMessage
            defaultMessage="Posted to the quote wall"
            id="QuoteImage.postedToWall"
          />
        ),
      })
    } catch (error) {
      const code = (error as { graphQLErrors?: { extensions?: { code?: string } }[] })
        ?.graphQLErrors?.[0]?.extensions?.code
      toast.error({
        message:
          code === ERROR_CODES.ACTION_LIMIT_EXCEEDED ? (
            <FormattedMessage
              defaultMessage="Wall quota reached for today — come back tomorrow!"
              id="QuoteImage.wallQuota"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Failed to post to the wall"
              id="QuoteImage.wallFailed"
            />
          ),
      })
    } finally {
      setPosting(false)
    }
  }

  const onShare = async () => {
    const url = await generate()
    if (!url) return
    analytics.trackEvent('click_button', {
      type: 'quote_image_share',
      pageType: 'article_detail',
    })
    try {
      const blob = await (await fetch(url)).blob()
      const file = new File([blob], 'matters-quote.jpg', { type: 'image/jpeg' })
      if (isMobile() && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] })
        return
      }
    } catch {
      // fall through to download
    }
    await onDownload()
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
                  posted ? (
                    <FormattedMessage defaultMessage="On the wall ✓" id="QuoteImage.onWall" />
                  ) : (
                    <FormattedMessage defaultMessage="Post to wall" id="QuoteImage.postToWall" />
                  )
                }
                color="green"
                loading={isPosting}
                disabled={isPosting || posted}
                onClick={onPostToWall}
              />
            )}
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Download" id="5q3qC0" />}
              color="green"
              onClick={onDownload}
            />
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
              color="greyDarker"
              onClick={onShare}
            />
          </>
        }
        smUpBtns={
          <>
            {articleId && canPostToWall && (
              <Dialog.TextButton
                text={
                  posted ? (
                    <FormattedMessage defaultMessage="On the wall ✓" id="QuoteImage.onWall" />
                  ) : (
                    <FormattedMessage defaultMessage="Post to wall" id="QuoteImage.postToWall" />
                  )
                }
                color="green"
                loading={isPosting}
                disabled={isPosting || posted}
                onClick={onPostToWall}
              />
            )}
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Download" id="5q3qC0" />}
              color="green"
              onClick={onDownload}
            />
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
              color="greyDarker"
              onClick={onShare}
            />
          </>
        }
      />
    </>
  )
}

export default QuoteImageDialogContent
