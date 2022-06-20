import { Dialog, Translate, useDialogSwitch } from '~/components'

import styles from './styles.css'

interface Props {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  revisionCountLeft: number
}

export const ReviseArticleDialog = ({ children, revisionCountLeft }: Props) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate zh_hant="修訂須知" zh_hans="修订须知" en="Edit Notice" />
          }
          closeDialog={closeDialog}
          closeTextId="cancel"
          mode="inner"
        />

        <Dialog.Message align="left" type="info">
          <p>
            <Translate
              zh_hant="修訂作品正文目前支持增加、刪除或替換中英文字符，"
              zh_hans="修订作品正文目前支持增加、删除或替换中英文字符，"
            />
            <b>
              <Translate zh_hant="單次修訂上限為" zh_hans="单次修订上限为" />
              <span className="count"> 50 </span>
              <Translate zh_hant="個編輯距離。" zh_hans="個編輯距離。" />
            </b>
          </p>
          <p>
            <Translate
              zh_hant="修訂後的作品即再版發佈至分佈式網絡。修訂前請自行保留上一版本備份"
              zh_hans="修訂後的作品即再版發佈至分佈式網絡。修訂前請自行保留上一版本備份"
            />{' '}
            📃
          </p>
          <p>
            <b>
              <Translate zh_hant="你還可以修訂" zh_hans="你还可以修订" />
              <span className="count"> {revisionCountLeft} </span>
              <Translate zh_hant="版" zh_hans="版" />
            </b>
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button onClick={closeDialog}>
            <Translate zh_hant="開始修訂" zh_hans="开始修订" en="Edit" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
      <style jsx>{styles}</style>
    </>
  )
}
