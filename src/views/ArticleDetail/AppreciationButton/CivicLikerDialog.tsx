import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { ANALYTICS_EVENTS, EXTERNAL_LINKS } from '~/common/enums'
import { analytics } from '~/common/utils'

interface CivicLikerDialogProps {
  onClose: () => void
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const CivicLikerDialog = ({ onClose, children }: CivicLikerDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => {
    setShowDialog(true)
    analytics.trackEvent(ANALYTICS_EVENTS.OPEN_CIVIC_LIKER_MODAL)
  }
  const close = () => {
    setShowDialog(false)
    analytics.trackEvent(ANALYTICS_EVENTS.CLOSE_CIVIC_LIKER_MODAL)
    onClose()
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} size="sm">
        <Dialog.Header
          title="joinCivicLiker"
          close={close}
          closeTextId="close"
        />

        <Dialog.Message align="left" spacing="sm">
          <p>
            <Translate
              zh_hant="讚賞公民是一場回饋優秀內容的運動。每月只需付出一杯咖啡的價錢，就能成為讚賞公民，從此每個點讚，都會化成對創作者的實質支持。"
              zh_hans="赞赏公民是一场回馈优秀内容的运动。每月只需付出一杯咖啡的价钱，就能成为赞赏公民，从此每个点赞，都会化成对创作者的实质支持。"
            />
          </p>

          <p>
            <Translate zh_hant="瞭解更多 " zh_hans="了解更多" />
            <a
              className="u-link-green"
              href={EXTERNAL_LINKS.CIVIC_LIKER_SUPPORT}
              target="_blank"
            >
              <Translate zh_hant="讚賞公民福利" zh_hans="赞赏公民福利" />
            </a>
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            htmlHref={EXTERNAL_LINKS.CIVIC_LIKER_JOIN}
            htmlTarget="_blank"
            onClick={close}
          >
            <Translate zh_hant="立即登記" zh_hans="立即登记" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="understood" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyCivicLikerDialog = (props: CivicLikerDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <CivicLikerDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)

export default LazyCivicLikerDialog
