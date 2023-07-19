import gql from 'graphql-tag'

import { EXTERNAL_LINKS } from '~/common/enums'
import { Dialog, Translate, useDialogSwitch } from '~/components'
import { CivicLikerAppreciateButtonUserFragment } from '~/gql/graphql'

interface CivicLikerDialogProps {
  user: CivicLikerAppreciateButtonUserFragment
  onClose: () => void
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
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
  const {
    show,
    openDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)
  const closeDialog = () => {
    baseCloseDialog()
    onClose()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="joinCivicLiker" />

        <Dialog.Message align="left" smUpAlign="left">
          <p>
            <Translate
              zh_hant="讚賞公民是一群願意持續回饋創作的網絡公民。成為讚賞公民可享以下福利："
              zh_hans="赞赏公民是一群愿意持续回馈创作的网络公民。成为赞赏公民可享以下福利："
              en="Civic Liker is a movement to reward good content and encourage openness. Be a Civil Liker to enjoy the following privileges:"
            />
          </p>

          <ul>
            <li>
              <Translate zh_hant="解鎖 " zh_hans="解锁 " en="Unlock " />
              <a
                className="u-link-green"
                href={EXTERNAL_LINKS.SUPER_LIKE}
                target="_blank"
                rel="noreferrer"
              >
                Super Like
              </a>
              <Translate
                zh_hant="，推廣時間內每天整點中午及凌晨獲贈一次 Super Like 的權利"
                zh_hans="，推广时间内每天整点中午及凌晨获赠一次 Super Like 的权利"
                en=" twice a day at noon and midnight during promotion period."
              />
            </li>
            <li>
              <Translate
                zh_hant="拍手讚賞作品對創作基金的分配有更大影響力"
                zh_hans="拍手赞赏作品对创作基金的分配有更大影响力"
                en="Your claps weighs more on the distribution from Creators Fund"
              />
            </li>
            <li>
              <Translate
                zh_hant="頭像顯示獨有的光環標記，突顯尊貴的身份"
                zh_hans="头像显示独有的光环标记，突显尊贵的身份"
                en="A light ring appears around your profile to show your splendor"
              />
            </li>
          </ul>

          <p>
            <Translate
              zh_hant="瞭解更多 "
              zh_hans="了解更多 "
              en="Learn more about "
            />
            <a
              className="u-link-green"
              href={EXTERNAL_LINKS.CIVIC_LIKER_SUPPORT}
              target="_blank"
              rel="noreferrer"
            >
              <Translate
                zh_hant="讚賞公民福利"
                zh_hans="赞赏公民福利"
                en="Civic Liker benefits"
              />
            </a>
          </p>
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                <Translate
                  zh_hant="立即登記"
                  zh_hans="立即登记"
                  en="Register now"
                />
              }
              htmlHref={
                user.liker.likerId
                  ? EXTERNAL_LINKS.CIVIC_LIKER(user.liker.likerId)
                  : EXTERNAL_LINKS.CIVIC_LIKER_JOIN
              }
              htmlTarget="_blank"
              rel="noopener"
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <Translate
                  zh_hant="立即登記"
                  zh_hans="立即登记"
                  en="Register now"
                />
              }
              htmlHref={
                user.liker.likerId
                  ? EXTERNAL_LINKS.CIVIC_LIKER(user.liker.likerId)
                  : EXTERNAL_LINKS.CIVIC_LIKER_JOIN
              }
              htmlTarget="_blank"
              rel="noopener"
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazyCivicLikerDialog = (props: CivicLikerDialogProps) => (
  <Dialog.Lazy mounted={<CivicLikerDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyCivicLikerDialog

LazyCivicLikerDialog.fragments = fragments
