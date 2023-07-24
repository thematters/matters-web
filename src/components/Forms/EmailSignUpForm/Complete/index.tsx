import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { redirectToTarget } from '~/common/utils'
import { Dialog, Layout, Media } from '~/components'

import styles from './styles.module.css'

const Complete = ({
  purpose,
  closeDialog,
}: {
  purpose?: 'dialog' | 'page'
  closeDialog?: () => void
}) => {
  const isInPage = purpose === 'page'

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.inPage]: isInPage,
  })

  const EnterButton = () => (
    <Dialog.TextButton
      text={
        <FormattedMessage
          defaultMessage="Enter Community"
          description="src/components/Forms/EmailSignUpForm/Complete.tsx"
        />
      }
      onClick={() => {
        redirectToTarget({
          fallback: isInPage ? 'homepage' : 'current',
        })
      }}
    />
  )

  return (
    <>
      {isInPage && (
        <Layout.Header
          left={<Layout.Header.Title id="register" />}
          right={
            <>
              <span />
              <Media at="sm">
                <EnterButton />
              </Media>
            </>
          }
        />
      )}

      {closeDialog && (
        <Dialog.Header
          title="successRegister"
          leftBtn={<span />}
          rightBtn={<EnterButton />}
        />
      )}

      <section className={containerClasses}>
        <Dialog.Message noSpacing={isInPage}>
          <h2>
            <FormattedMessage
              defaultMessage="Welcome to Matters!"
              description="src/components/Forms/EmailSignUpForm/Complete.tsx"
            />
          </h2>

          <p>
            <FormattedMessage
              defaultMessage="Now, go like the authors you support! Your Likes will become their income"
              description="src/components/Forms/EmailSignUpForm/Complete.tsx"
            />
          </p>

          <p>
            <FormattedMessage
              defaultMessage="You have created your personal creative space. Publish your first work!"
              description="src/components/Forms/EmailSignUpForm/Complete.tsx"
            />
          </p>

          <p>
            <FormattedMessage
              defaultMessage="Start creating now!"
              description="src/components/Forms/EmailSignUpForm/Complete.tsx"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer smUpBtns={<EnterButton />} />
      </section>
    </>
  )
}

export default Complete
