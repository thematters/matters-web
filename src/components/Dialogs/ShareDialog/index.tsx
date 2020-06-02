import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { TextId } from '~/common/enums'
import { isMobile } from '~/common/utils'

import Copy from './Copy'
import Douban from './Douban'
import Email from './Email'
import Facebook from './Facebook'
import LINE from './LINE'
import styles from './styles.css'
import Telegram from './Telegram'
import Twitter from './Twitter'
import Weibo from './Weibo'
import WhatsApp from './WhatsApp'

export interface ShareDialogProps {
  title?: string
  path?: string

  headerTitle?: TextId | React.ReactElement
  description?: React.ReactNode
  footerButtons?: React.ReactNode

  children: ({ open }: { open: () => void }) => React.ReactNode
}

type BaseShareDialogProps = {
  onShare: (fallbackShare: () => void) => void
  shareTitle: string
  shareLink: string
} & Pick<
  ShareDialogProps,
  'children' | 'headerTitle' | 'description' | 'footerButtons'
>

const BaseShareDialog = ({
  onShare,
  shareTitle,
  shareLink,

  headerTitle,
  description,
  footerButtons,

  children,
}: BaseShareDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open: () => onShare(open) })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close}>
        <Dialog.Header
          title={headerTitle || 'share'}
          close={close}
          closeTextId="close"
          mode={headerTitle ? 'inner' : 'hidden'}
        />

        <Dialog.Content>
          {description && (
            <section className="description">
              {description}

              <style jsx>{styles}</style>
            </section>
          )}

          <section className="socials-container">
            <section className="left">
              <LINE title={shareTitle} link={shareLink} />
              <WhatsApp title={shareTitle} link={shareLink} />
              <Telegram title={shareTitle} link={shareLink} />
              <Douban title={shareTitle} link={shareLink} />
            </section>

            <section className="right">
              <Twitter title={shareTitle} link={shareLink} />
              <Facebook title={shareTitle} link={shareLink} />
              <Weibo title={shareTitle} link={shareLink} />
              <Email title={shareTitle} link={shareLink} />
            </section>

            <style jsx>{styles}</style>
          </section>

          <Copy link={shareLink} />
        </Dialog.Content>

        <Dialog.Footer>
          {footerButtons || (
            <Dialog.Footer.Button
              bgColor="grey-lighter"
              textColor="black"
              onClick={close}
            >
              <Translate id="close" />
            </Dialog.Footer.Button>
          )}
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export const ShareDialog = (props: ShareDialogProps) => {
  const { title, path } = props
  const shareLink = process.browser
    ? path
      ? `${window.location.origin}${path}`
      : window.location.href
    : ''
  const shareTitle =
    title || (process.browser ? window.document.title || '' : '')

  const onShare = async (fallbackShare: () => void) => {
    const navigator = window.navigator as any

    if (navigator.share && isMobile()) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareLink,
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      fallbackShare()
    }
  }

  return (
    <Dialog.Lazy
      mounted={
        <BaseShareDialog
          {...props}
          onShare={onShare}
          shareTitle={shareTitle}
          shareLink={shareLink}
        />
      }
    >
      {({ open }) => <>{props.children({ open: () => onShare(open) })}</>}
    </Dialog.Lazy>
  )
}
