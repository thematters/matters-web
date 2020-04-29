import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

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

import { ClientInfo } from '~/components/GQL/queries/__generated__/ClientInfo'

export interface ShareDialogProps {
  title?: string
  path?: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

type BaseShareDialogProps = {
  onShare: (fallbackShare: () => void) => void
  shareTitle: string
  shareLink: string
} & Pick<ShareDialogProps, 'children'>

const BaseShareDialog = ({
  onShare,
  shareTitle,
  shareLink,
  children,
}: BaseShareDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open: () => onShare(open) })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} slideIn>
        <Dialog.Header
          title="share"
          close={close}
          closeTextId="close"
          mode="hidden"
        />

        <Dialog.Content>
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
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export const ShareDialog = (props: ShareDialogProps) => {
  const { title, path } = props
  const { data } = useQuery<ClientInfo>(CLIENT_INFO, {
    variables: { id: 'local' },
  })
  const isMobile = data?.clientInfo.isMobile
  const shareLink = process.browser
    ? path
      ? `${window.location.origin}${path}`
      : window.location.href
    : ''
  const shareTitle =
    title || (process.browser ? window.document.title || '' : '')

  const onShare = async (fallbackShare: () => void) => {
    const navigator = window.navigator as any

    if (navigator.share && isMobile) {
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

    analytics.trackEvent(ANALYTICS_EVENTS, {
      type: SHARE_TYPE.ROOT,
      url: shareLink,
    })
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
      {({ open }) => <>{props.children({ open })}</>}
    </Dialog.Lazy>
  )
}
