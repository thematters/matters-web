import { Dialog, Translate } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, redirectToTarget } from '~/common/utils'

export const SignUpComplete = ({
  purpose,
  closeDialog
}: {
  purpose?: 'dialog' | 'page'
  closeDialog?: () => void
}) => {
  const isInPage = purpose === 'page'

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title={<Translate id="successRegister" />}
          close={closeDialog}
          headerHidden
        />
      )}

      <Dialog.Message
        headline={
          <Translate
            zh_hant="歡迎加入 Matters！"
            zh_hans="欢迎加入 Matters！"
          />
        }
        textAlign="left"
        description={
          <>
            <p>
              <Translate
                zh_hant="現在，去為你喜歡的作者打賞吧！你的每一次打賞都將為作者帶來收入。"
                zh_hans="现在，去为你喜欢的作者打赏吧！你的每一次打赏都将为作者带来收入。"
              />
            </p>
            <br />

            <p>
              <Translate
                zh_hant="你已擁有個人創作空間站，期待你的第一篇作品。"
                zh_hans="你已拥有个人创作空间站，期待你的第一篇作品。"
              />
            </p>
            <br />

            <p>
              <Translate
                zh_hant="馬上開始你的創作吧！"
                zh_hans="马上开始你的创作吧！"
              />
            </p>
          </>
        }
      />

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={() => {
            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_ENTER_AFTER_SIGNUP)
            redirectToTarget({
              fallback: isInPage ? 'homepage' : 'current'
            })
          }}
        >
          <Translate zh_hant="進入社區" zh_hans="进入社区" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}
