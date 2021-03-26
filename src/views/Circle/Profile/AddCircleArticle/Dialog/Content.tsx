import { Dialog, Translate } from '~/components'

interface ContentProps {
  loading: boolean
  onConfirm: () => void
  closeDialog: () => void
}

const Content: React.FC<ContentProps> = ({
  loading,
  onConfirm,
  closeDialog,
}) => {
  return (
    <>
      <Dialog.Header
        title="circleAddArticles"
        close={closeDialog}
        mode="inner"
      />

      <Dialog.Message align="left" type="info">
        <ul>
          <li>
            <Translate
              zh_hant="作品進入圍爐後自動開啟 24 小時限免"
              zh_hans="作品进入围炉后自动开启 24 小时限免"
              en="Articles added to Circle will be free to read for 24 hours."
            />
          </li>
          <li>
            <Translate
              zh_hant="進入圍爐的作品暫不支持移出圍爐"
              zh_hans="进入围炉的作品暂不支持移出围炉"
              en="This action cannot be undone."
            />
          </li>
        </ul>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button onClick={onConfirm} loading={loading}>
          <Translate
            zh_hant="確認添加"
            zh_hans="确认添加"
            en="Confirm to Add"
          />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          bgColor="grey-lighter"
          textColor="black"
          onClick={closeDialog}
        >
          <Translate zh_hant="暫時不要" zh_hans="暂时不要" en="Not Now" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Content
