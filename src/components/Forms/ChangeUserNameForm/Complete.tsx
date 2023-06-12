import { BackToHomeButton, Dialog, Layout, Translate } from '~/components'

const Complete = ({
  purpose,
  closeDialog,
}: {
  purpose: 'dialog' | 'page'
  closeDialog?: () => void
}) => {
  const isInPage = purpose === 'page'

  return (
    <>
      {isInPage && (
        <Layout.Header left={<Layout.Header.Title id="changeUserName" />} />
      )}

      {closeDialog && (
        <Dialog.Header
          title="changeUserName"
          closeDialog={closeDialog}
          closeTextId="close"
          mode="inner"
        />
      )}

      <Dialog.Message spacing="md">
        <h3>
          <Translate id="successChangeUserName" />
        </h3>
        <br />
        {isInPage && <BackToHomeButton />}
      </Dialog.Message>

      {!isInPage && closeDialog && (
        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="greyLighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      )}
    </>
  )
}

export default Complete
