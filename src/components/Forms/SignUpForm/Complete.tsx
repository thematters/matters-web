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

      <Dialog.Message spacing="md">
        <h3>
          <Translate zh_hant="開啟星際導航 ❤️" zh_hans="开启星际导航 ❤" />
        </h3>

        <p>
          <Translate
            zh_hant="跟隨導航遊覽社區，"
            zh_hans="跟随导航游览社区，"
          />
          <br />
          <Translate
            zh_hant="祝你在馬特市玩耍愉快。"
            zh_hans="祝你在马特市玩耍愉快。"
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          bgColor="gold"
          textColor="white"
          onClick={() => {
            redirectToTarget({
              fallback: isInPage ? 'homepage' : 'current',
            })
          }}
        >
          <Translate zh_hant="開啟星際導航" zh_hans="开启星际导航" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Complete
