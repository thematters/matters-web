import { FormattedMessage } from 'react-intl'

import IconLeft from '@/public/static/icons/24px/left.svg'
import IconNomad1Background from '@/public/static/images/badge-nomad1-background.svg'
import IconNomad2Background from '@/public/static/images/badge-nomad2-background.svg'
import IconNomad3Background from '@/public/static/images/badge-nomad3-background.svg'
import IconNomad4Background from '@/public/static/images/badge-nomad4-background.svg'
import { URL_USER_PROFILE } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, CopyToClipboard, Dialog, Icon, useRoute } from '~/components'

import styles from './styles.module.css'

type BadgeNomadDialogContentProps = {
  nomadBadgeLevel: 1 | 2 | 3 | 4
  closeDialog: () => void
  goBack?: () => void
}

const BadgeNomadDialogContent = ({
  closeDialog,
  nomadBadgeLevel,
  goBack,
}: BadgeNomadDialogContentProps) => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const userProfilePath = toPath({
    page: 'userProfile',
    userName,
  })
  const shareLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}${userProfilePath.href}?${URL_USER_PROFILE.OPEN_NOMAD_BADGE_DIALOG.key}=${URL_USER_PROFILE.OPEN_NOMAD_BADGE_DIALOG.value}`
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
            {nomadBadgeLevel === 4 ? (
              <IconNomad4Background />
            ) : nomadBadgeLevel === 3 ? (
              <IconNomad3Background />
            ) : nomadBadgeLevel === 2 ? (
              <IconNomad2Background />
            ) : (
              <IconNomad1Background />
            )}
          </section>

          <Dialog.Content.Message align="center" smUpAlign="center">
            <h1 className={styles.title}>
              {nomadBadgeLevel === 4 ? (
                <FormattedMessage defaultMessage="Firebolt" id="Rc4Oij" />
              ) : nomadBadgeLevel === 3 ? (
                <FormattedMessage defaultMessage="Nimbus Ferry" id="8MeJ4b" />
              ) : nomadBadgeLevel === 2 ? (
                <FormattedMessage defaultMessage="Meteor Canoe" id="TKsfIS" />
              ) : (
                <FormattedMessage
                  defaultMessage="Moonlight Dream"
                  id="76yoL6"
                />
              )}
            </h1>
            <p>
              {nomadBadgeLevel === 4 ? (
                <FormattedMessage
                  defaultMessage="Breaking through history! The torch you've ignited will be the most dazzling support on the Nomad's journey. The Firebolt badge signifies your participation in the Nomad Matters and earning the highest-level Firebolt badge."
                  id="4km7Yc"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              ) : nomadBadgeLevel === 3 ? (
                <FormattedMessage
                  defaultMessage="Wings have sprouted on the badge, and the halo of dreams is beginning to spin. The Nimbus Ferry badge signifies your participation in the Nomad Matters."
                  id="LUWKnn"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              ) : nomadBadgeLevel === 2 ? (
                <FormattedMessage
                  defaultMessage="The dazzling light of a meteor shower is enough to illuminate the night sky. The Meteor Canoe badge signifies your participation in the Nomad Matters."
                  id="dAPUJp"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Under the moonlight, dreams are about to come true. The Moonlight Dream badge signifies your participation in the Nomad Matters."
                  id="iTcMqz"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
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

export default BadgeNomadDialogContent
