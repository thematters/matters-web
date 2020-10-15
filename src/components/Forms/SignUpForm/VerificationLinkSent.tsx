import { Dialog, Layout, Translate } from '~/components'

const VerificationLinkSent = ({
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

      <Dialog.Message spacing="md">
        <h3>
          <Translate
            zh_hant="已發送快速註冊連結"
            zh_hans="已发送快速链接连结"
          />
        </h3>

        <p>
          <Translate
            zh_hant="我們已將註冊連結寄出 📩"
            zh_hans="我们已将注册链接寄出 📩"
          />
          <br />
          <Translate
            zh_hant="快去你的電子信箱看看吧！"
            zh_hans="快去你的邮箱看看吧！"
          />
        </p>
      </Dialog.Message>

      {closeDialog && (
        <Dialog.Footer>
          <Dialog.Footer.Button
            onClick={closeDialog}
            bgColor="grey-lighter"
            textColor="black"
          >
            <Translate id="understood" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      )}
    </>
  )
}

export default VerificationLinkSent
