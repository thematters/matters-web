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
          title="successChangeUserName"
          close={closeDialog}
          closeTextId="close"
          headerHidden
        />
      )}

      <Dialog.Message
        description={
          <>
            <p>
              <Translate id="successChangeUserName" />
            </p>
            <br />
            {isInPage && <BackToHomeButton />}
          </>
        }
      />

      {!isInPage && closeDialog && (
        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="grey-lighter"
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
