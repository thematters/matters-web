import { Dialog, Layout, Translate } from '~/components'

import { redirectToTarget } from '~/common/utils'

const Complete = ({
  purpose,
  closeDialog,
}: {
  purpose?: 'dialog' | 'page'
  closeDialog?: () => void
}) => {
  const isInPage = purpose === 'page'

  return (
    <>
      {isInPage && (
        <Layout.Header left={<Layout.Header.Title id="register" />} />
      )}

      {closeDialog && (
        <Dialog.Header
          title="successRegister"
          close={closeDialog}
          closeTextId="close"
          mode="inner"
        />
      )}

      <Dialog.Message align="left" spacing="md">
        <h3>
          <Translate
            zh_hant="歡迎加入 Matters！"
            zh_hans="欢迎加入 Matters！"
            en="Welcome to Matters!"
          />
        </h3>

        <p>
          <Translate
            zh_hant="現在，去為你喜歡的作者打賞吧！你的每一次打賞都將為作者帶來收入。"
            zh_hans="现在，去为你喜欢的作者打赏吧！你的每一次打赏都将为作者带来收入。"
            en="Now go like the authors you support! Your like will turn into income for them."
          />
        </p>

        <p>
          <Translate
            zh_hant="你已擁有個人創作空間站，期待你的第一篇作品。"
            zh_hans="你已拥有个人创作空间站，期待你的第一篇作品。"
            en="You have created your own creative space, waiting for your first work."
          />
        </p>

        <p>
          <Translate
            zh_hant="馬上開始你的創作吧！"
            zh_hans="马上开始你的创作吧！"
            en="Start creating now!"
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={() => {
            redirectToTarget({
              fallback: isInPage ? 'homepage' : 'current',
            })
          }}
        >
          <Translate
            zh_hant="進入社區"
            zh_hans="进入社区"
            en="enter community"
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Complete
