import { FormattedMessage } from 'react-intl'

import { Dialog, TableView } from '~/components'

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
              <FormattedMessage
                defaultMessage="Connect your own Liker ID"
                id="OxLyC5"
              />
            }
            subtitle={
              <FormattedMessage
                defaultMessage="Verify your Liker ID through like.co"
                id="gzJEFb"
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
