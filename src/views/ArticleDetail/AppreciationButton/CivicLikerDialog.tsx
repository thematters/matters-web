import { gql } from '@apollo/client'
import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

import { CivicLikerAppreciateButtonUser } from './__generated__/CivicLikerAppreciateButtonUser'

interface CivicLikerDialogProps {
  user: CivicLikerAppreciateButtonUser
  onClose: () => void
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const fragments = {
  user: gql`
    fragment CivicLikerAppreciateButtonUser on User {
      id
      liker {
        likerId
      }
    }
  `,
}

const CivicLikerDialog = ({
  user,
  onClose,
  children,
}: CivicLikerDialogProps) => {
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

        <Dialog.Message align="left" type="info">
          <p>
            <Translate
              zh_hant="讚賞公民是一群願意持續回饋創作的網絡公民。成為讚賞公民可享以下福利："
              zh_hans="赞赏公民是一群愿意持续回馈创作的网络公民。成为赞赏公民可享以下福利："
            />
          </p>

          <ul>
            <li>
              <Translate zh_hant="解鎖 " zh_hans="解锁 " />
              <a
                className="u-link-green"
                href={EXTERNAL_LINKS.SUPER_LIKE}
                target="_blank"
              >
                Super Like
              </a>
              <Translate
                zh_hant="，推廣時間內每天整點中午及凌晨獲贈一次 Super Like 的權利"
                zh_hans="，推广时间内每天整点中午及凌晨获赠一次 Super Like 的权利"
              />
            </li>
            <li>
              <Translate
                zh_hant="拍手讚賞作品對創作基金的分配有更大影響力"
                zh_hans="拍手赞赏作品对创作基金的分配有更大影响力"
              />
            </li>
            <li>
              <Translate
                zh_hant="頭像顯示獨有的光環標記，突顯尊貴的身份"
                zh_hans="头像显示独有的光环标记，突显尊贵的身份"
              />
            </li>
          </ul>

          <p>
            <Translate zh_hant="瞭解更多 " zh_hans="了解更多 " />
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
            htmlHref={
              user.liker.likerId
                ? EXTERNAL_LINKS.CIVIC_LIKER(user.liker.likerId)
                : EXTERNAL_LINKS.CIVIC_LIKER_JOIN
            }
            htmlTarget="_blank"
            rel="noopener"
            onClick={close}
          >
            <Translate
              zh_hant="立即登記"
              zh_hans="立即登记"
              en="register at once"
            />
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

LazyCivicLikerDialog.fragments = fragments
