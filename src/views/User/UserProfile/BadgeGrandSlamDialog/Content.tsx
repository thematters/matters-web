import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconLeft } from '@/public/static/icons/24px/left.svg'
import { ReactComponent as GrandSlamBackground } from '@/public/static/images/badge-grand-slam-background.svg'
import { URL_USER_PROFILE } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, CopyToClipboard, Dialog, Icon, useRoute } from '~/components'

import styles from './styles.module.css'

type BadgeGrandSlamDialogContentProps = {
  closeDialog: () => void
  goBack?: () => void
}

const BadgeGrandSlamDialogContent = ({
  closeDialog,
  goBack,
}: BadgeGrandSlamDialogContentProps) => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const userProfilePath = toPath({
    page: 'userProfile',
    userName,
  })
  const shareLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}${userProfilePath.href}?${URL_USER_PROFILE.OPEN_GRAND_SLAM_BADGE_DIALOG.key}=${URL_USER_PROFILE.OPEN_GRAND_SLAM_BADGE_DIALOG.value}`
      : ''

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
            <GrandSlamBackground />
          </section>

          <Dialog.Content.Message align="center" smUpAlign="center">
            <h1 className={styles.title}>
              <FormattedMessage
                defaultMessage="Free Write in 7 days Grand Badge"
                id="W3hNBA"
              />
            </h1>
            <p>
              <FormattedMessage
                defaultMessage='The badge signifies your participation and completion in the "Free Write in 7 days".'
                id="8+Z5E9"
              />
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

export default BadgeGrandSlamDialogContent
