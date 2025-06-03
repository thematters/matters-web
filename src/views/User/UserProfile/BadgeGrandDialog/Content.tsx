import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconLeft from '@/public/static/icons/24px/left.svg'
import IconGrandBackground from '@/public/static/images/badge-grand-background.svg'
import { URL_USER_PROFILE } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, CopyToClipboard, Dialog, Icon, useRoute } from '~/components'

import styles from './styles.module.css'

type BadgeGrandDialogContentProps = {
  closeDialog: () => void
  goBack?: () => void
}

const BadgeGrandDialogContent = ({
  closeDialog,
  goBack,
}: BadgeGrandDialogContentProps) => {
  const { getQuery, router } = useRoute()
  const userName = getQuery('name')
  const userProfilePath = toPath({
    page: 'userProfile',
    userName,
  })
  const shareLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}${userProfilePath.href}?${URL_USER_PROFILE.OPEN_GRAND_BADGE_DIALOG.key}=${URL_USER_PROFILE.OPEN_GRAND_BADGE_DIALOG.value}`
      : ''
  const initialCongrats =
    getQuery(URL_USER_PROFILE.GRAND_BADGE_DIALOG_STEP.key) ===
    URL_USER_PROFILE.GRAND_BADGE_DIALOG_STEP.value
  const [isCongrats] = useState(initialCongrats)

  // remove `dialog` and `step` query params
  useEffect(() => {
    router.replace(userProfilePath.href, undefined, { shallow: true })
  }, [])

  return (
    <>
      {goBack && (
        <Dialog.Header
          title={<span />}
          leftBtn={
            <Button
              onClick={goBack}
              textColor="greyDarker"
              textActiveColor="black"
            >
              <Icon icon={IconLeft} size={20} />
            </Button>
          }
        />
      )}

      <Dialog.Content>
        <section className={styles.container}>
          <section className={styles.badgeIcon}>
            <IconGrandBackground />
          </section>

          <Dialog.Content.Message align="center" smUpAlign="center">
            <h1 className={styles.title}>
              {isCongrats ? (
                <FormattedMessage
                  defaultMessage="Congratulations! You've got the Grand Badge!"
                  id="Sfql0+"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Free Write in 7 days Grand Badge"
                  id="W3hNBA"
                />
              )}
            </h1>
            <p>
              {isCongrats ? (
                <FormattedMessage
                  defaultMessage="This badge represents your completion of Free Write in 7 days. Congratulations on finishing this meaningful writing journey!"
                  id="LoQ3BF"
                />
              ) : (
                <FormattedMessage
                  defaultMessage='The badge signifies your participation and completion in the "Free Write in 7 days".'
                  id="8+Z5E9"
                />
              )}
            </p>
          </Dialog.Content.Message>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <CopyToClipboard
            text={shareLink}
            successMessage={
              <FormattedMessage
                defaultMessage="Share link copied"
                id="/faseS"
              />
            }
          >
            {({ copyToClipboard }) => (
              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
                color="greyDarker"
                onClick={copyToClipboard}
              />
            )}
          </CopyToClipboard>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                goBack ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Close" id="rbrahO" />
                )
              }
              color="greyDarker"
              onClick={goBack || closeDialog}
            />

            <CopyToClipboard
              text={shareLink}
              successMessage={
                <FormattedMessage
                  defaultMessage="Share link copied"
                  id="/faseS"
                />
              }
            >
              {({ copyToClipboard }) => (
                <Dialog.TextButton
                  text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
                  color="green"
                  onClick={copyToClipboard}
                />
              )}
            </CopyToClipboard>
          </>
        }
      />
    </>
  )
}

export default BadgeGrandDialogContent
