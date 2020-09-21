import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

interface CivicLikerDialogProps {
  onClose: () => void
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const CivicLikerDialog = ({ onClose, children }: CivicLikerDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => {
    setShowDialog(true)
  }
  const close = () => {
    setShowDialog(false)
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
          mode="inner"
        />

        <Dialog.Message align="left">
          <p>
            <Translate zh_hant="加入讚賞公民解鎖" zh_hans="加入赞赏公民解锁" />
            &nbsp;
            <a
              className="u-link-green"
              href={EXTERNAL_LINKS.SUPER_LIKE}
              target="_blank"
            >
              <Translate zh_hant="Super Like" zh_hans="Super Like" />
            </a>
            <Translate
              zh_hant="，本年內每天整點中午及凌晨獲贈一個 Super Like。"
              zh_hans="，本年内每天整点中午及凌晨获赠一个 Super Like。"
            />
          </p>

          <ul>
            <li>
              <Translate
                zh_hant="直接支付額外 LikeCoin，進一步支持作者"
                zh_hans="直接支付额外 LikeCoin，进一步支持作者"
              />
            </li>
            <li>
              <Translate
                zh_hant="成為內容伯樂，每天推薦好作品"
                zh_hans="成为内容伯乐，每天推荐好作品"
              />
            </li>
            <li>
              <Translate
                zh_hant="每當作品產生下線 Super Like，內容伯樂及作者同時獲得回饋"
                zh_hans="每当作品产生下线 Super Like，内容伯乐及作者同时获得回馈"
              />
            </li>
          </ul>

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
            rel="noopener"
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
  <Dialog.Lazy mounted={<CivicLikerDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyCivicLikerDialog
