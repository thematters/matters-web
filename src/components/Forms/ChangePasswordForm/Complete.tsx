import { PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'
import { BackToHomeButton, Dialog, Layout, Translate } from '~/components'

interface Props {
  type: 'forget' | 'change'
  purpose: 'dialog' | 'page'
  closeDialog?: () => void
}

const Complete: React.FC<Props> = ({ type, purpose, closeDialog }) => {
  const isForget = type === 'forget'
  const isInPage = purpose === 'page'
  const titleId = isForget ? 'resetPassword' : 'changePassword'
  const descriptionId = isForget
    ? 'successResetPassword'
    : 'successChangePassword'

  return (
    <>
      <Layout.Header left={<Layout.Header.Title id={titleId} />} />

      {closeDialog && (
        <Dialog.Header
          title={titleId}
          closeDialog={closeDialog}
          closeTextId="close"
          mode="inner"
        />
      )}

      <Dialog.Message spacing="md">
        <h3>
          <Translate id={descriptionId} />
        </h3>
        <br />
        {isInPage && <BackToHomeButton />}
      </Dialog.Message>

      {!isInPage && (
        <Dialog.Footer>
          {isForget && (
            <Dialog.Footer.Button {...appendTarget(PATHS.LOGIN)}>
              <Translate id="login" />
            </Dialog.Footer.Button>
          )}

          {closeDialog && (
            <Dialog.Footer.Button
              bgColor="greyLighter"
              textColor="black"
              onClick={closeDialog}
            >
              <Translate id="close" />
            </Dialog.Footer.Button>
          )}
        </Dialog.Footer>
      )}
    </>
  )
}

export default Complete
