import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconLeft } from '@/public/static/icons/24px/left.svg'
import { ReactComponent as Nomad1Background } from '@/public/static/images/badge-nomad1-background.svg'
import { ReactComponent as Nomad2Background } from '@/public/static/images/badge-nomad2-background.svg'
import { ReactComponent as Nomad3Background } from '@/public/static/images/badge-nomad3-background.svg'
import { ReactComponent as Nomad4Background } from '@/public/static/images/badge-nomad4-background.svg'
import { BREAKPOINTS } from '~/common/enums'
import {
  Button,
  CopyToClipboard,
  Dialog,
  Icon,
  useMediaQuery,
} from '~/components'

import styles from './styles.module.css'

type BadgeNomadDialogContentProps = {
  closeDialog: () => void
  nomadBadgeLevel: 1 | 2 | 3 | 4
  shareLink: string
  isNested?: boolean
  goBack?: () => void
}

const BadgeNomadDialogContent = ({
  closeDialog,
  nomadBadgeLevel,
  shareLink,
  isNested,
  goBack,
}: BadgeNomadDialogContentProps) => {
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  return (
    <>
      {isNested && goBack && (
        <Dialog.Header
          title={<span />}
          leftBtn={
            <Button
              onClick={goBack}
              textColor="greyDarker"
              textActiveColor="black"
            >
              <Icon icon={IconLeft} size="mdS" />
            </Button>
          }
        />
      )}

      <Dialog.Content fixedHeight={!isSmUp} noMaxHeight>
        <section className={styles.container}>
          <section className={styles.badgeIcon}>
            {nomadBadgeLevel === 4 ? (
              <Nomad4Background />
            ) : nomadBadgeLevel === 3 ? (
              <Nomad3Background />
            ) : nomadBadgeLevel === 2 ? (
              <Nomad2Background />
            ) : (
              <Nomad1Background />
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
                isNested ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Close" id="rbrahO" />
                )
              }
              color="greyDarker"
              onClick={isNested ? goBack : closeDialog}
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
