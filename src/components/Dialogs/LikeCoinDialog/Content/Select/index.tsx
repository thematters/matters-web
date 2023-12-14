import { FormattedMessage } from 'react-intl'

import { Dialog, TableView, Translate } from '~/components'

import Intro from './Intro'

interface SelectProps {
  startBind: (windowRef: Window) => void
  closeDialog: () => void
}

const Select: React.FC<SelectProps> = ({ startBind, closeDialog }) => {
  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Liker ID" id="iEJeQH" />}
        closeDialog={closeDialog}
        closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
      />

      <Dialog.Content>
        <TableView spacingX={0}>
          <TableView.Cell
            title={
              <Translate
                zh_hant="綁定現有 Liker ID"
                zh_hans="绑定现有 Liker ID"
                en="Connect your own Liker ID"
              />
            }
            subtitle={
              <Translate
                zh_hant="跳轉到 like.co 驗證已有 Liker ID"
                zh_hans="跳转到 like.co 验证已有 Liker ID"
                en="Verify your Liker ID through like.co"
              />
            }
            onClick={() => {
              const url = `${process.env.NEXT_PUBLIC_OAUTH_URL}/likecoin`
              const windowRef = window.open(url, '_blank')

              if (windowRef) {
                startBind(windowRef)
              }
            }}
            role="button"
          />
        </TableView>

        <Intro />
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default Select
