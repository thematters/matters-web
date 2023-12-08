import classNames from 'classnames'
// import Link from 'next/link'
// import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as Nomad1Background } from '@/public/static/images/badge-nomad1-background.svg'
import { ReactComponent as Nomad2Background } from '@/public/static/images/badge-nomad2-background.svg'
import { ReactComponent as Nomad3Background } from '@/public/static/images/badge-nomad3-background.svg'
import { ReactComponent as Nomad4Background } from '@/public/static/images/badge-nomad4-background.svg'
import { OPEN_SHOW_NOMAD_BADGE_DIALOG } from '~/common/enums'
import {
  Button,
  CopyToClipboard,
  Dialog,
  // IconWallet20,
  IconArrowLeft16,
  // TextIcon,
  Tooltip,
  useDialogSwitch,
  useEventListener,
} from '~/components'
import { UserStatus } from '~/gql/graphql'

import { NomadBadge } from '../Badges'
import styles from './styles.module.css'

type BadgeNomadLabelProps = {
  hasTooltip?: boolean
  nomadBadgeLevel: 1 | 2 | 3 | 4
  totalReferredCount?: UserStatus['totalReferredCount']
  shareLink?: string
  // defaultShowDialog: boolean
}

type BadgeNomadDialogProps = BadgeNomadLabelProps & {
  // content?: React.ReactNode
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode

  isNested?: boolean // if nested by another dialog
}

export const BadgeNomadDialog: React.FC<BadgeNomadDialogProps> = ({
  // content,
  children,
  nomadBadgeLevel,
  totalReferredCount,
  shareLink,
  isNested,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false) // the initial value to open not working

  useEventListener(OPEN_SHOW_NOMAD_BADGE_DIALOG, openDialog)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {isNested && (
          <Dialog.Header
            title={<span />}
            leftBtn={
              <Button onClick={closeDialog}>
                <IconArrowLeft16 size="mdS" color="greyDarker" />
              </Button>
            }
          />
        )}

        <Dialog.Content fixedHeight>
          <section
            className={classNames({
              [styles.dialogContent]: true,
              [styles.noHeader]: !isNested,
            })}
          >
            {nomadBadgeLevel === 4 ? (
              <Nomad4Background />
            ) : nomadBadgeLevel === 3 ? (
              <Nomad3Background />
            ) : nomadBadgeLevel === 2 ? (
              <Nomad2Background />
            ) : (
              <Nomad1Background />
            )}
            <section className={styles.info}>
              <h3 className={styles.title}>
                {nomadBadgeLevel === 4 ? (
                  <FormattedMessage defaultMessage="LV4 Firebolt" id="FuU2MU" />
                ) : nomadBadgeLevel === 3 ? (
                  <FormattedMessage
                    defaultMessage="LV3 Nimbus Ferry"
                    id="sLiIAz"
                  />
                ) : nomadBadgeLevel === 2 ? (
                  <FormattedMessage
                    defaultMessage="LV2 Meteor Canoe"
                    id="7ZXP9S"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="LV1 Moonlight Dream"
                    id="+56XIp"
                  />
                )}
              </h3>
              <p className={styles.description}>
                {nomadBadgeLevel === 4 ? (
                  <FormattedMessage
                    defaultMessage="Breaking through history! The torch you've ignited will be the most dazzling support on the Nomad's journey. Congratulations on reaching the final destination of the Nomad Matters with 20 friends and earning the highest-level Firebolt badge."
                    id="p0oPHP"
                    values={{
                      br: <br />,
                      // b: (chunks) => <b>{chunks}</b>,
                    }}
                    description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                  />
                ) : nomadBadgeLevel === 3 ? (
                  <FormattedMessage
                    defaultMessage="Wings have sprouted on the badge, and the halo of dreams is beginning to spin. You have gathered 10 companions on the Nomad's path. Invite another 10 fellow travelers to move towards the final destination together, where the highest level of honor awaits you."
                    id="DdVBFV"
                    values={{
                      br: <br />,
                      // b: (chunks) => <b>{chunks}</b>,
                    }}
                    description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                  />
                ) : nomadBadgeLevel === 2 ? (
                  <FormattedMessage
                    defaultMessage="The dazzling light of a meteor shower is there to illuminate the night sky. Congratulations on having invited 5 companions to participate in Nomad Matters. Invite 5 more to level up, the more the merrier!"
                    id="qTjjF0"
                    values={{
                      br: <br />,
                      // b: (chunks) => <b>{chunks}</b>,
                    }}
                    description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="Under the moonlight, your dreams are about to come true. The Moonlight Dream badge glorifies your initial participation in the Nomad Matters. To reach the next level, invite 5 friends to join the journey with you. <a>Click here in the last paragraph to find out how to invite new companions</a>"
                    id="Z31Fz+"
                    values={{
                      br: <br />,
                      a: (chunks) => (
                        <a href={'/@hi176/464035-nomad-matters'}>{chunks}</a>
                      ),
                    }}
                    description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                  />
                )}
              </p>
            </section>
          </section>
        </Dialog.Content>

        <Dialog.Footer
          // stickBottom
          btns={
            <>
              {!isNested && (
                <Dialog.RoundedButton
                  text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                  color="greyDarker"
                  onClick={closeDialog}
                />
              )}
              <CopyToClipboard
                text={shareLink!}
                successMessage={
                  <FormattedMessage
                    defaultMessage="Share link copied"
                    id="/faseS"
                  />
                }
              >
                <Dialog.RoundedButton
                  text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
                  color={isNested ? 'greyDarker' : 'green'}
                />
              </CopyToClipboard>
            </>
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
                onClick={closeDialog}
              />
              <CopyToClipboard
                text={shareLink!}
                successMessage={
                  <FormattedMessage
                    defaultMessage="Share link copied"
                    id="/faseS"
                  />
                }
              >
                <Dialog.TextButton
                  text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
                  color="green"
                />
              </CopyToClipboard>
            </>
          }
        />
      </Dialog>
    </>
  )
}

export const BadgeNomadLabel: React.FC<BadgeNomadLabelProps> = ({
  hasTooltip,
  nomadBadgeLevel,
  totalReferredCount,
  shareLink,
  // defaultShowDialog,
}) => (
  <BadgeNomadDialog
    nomadBadgeLevel={nomadBadgeLevel}
    totalReferredCount={totalReferredCount}
    shareLink={shareLink}
  >
    {({ openDialog }) => {
      const Content = (
        <span className={styles.badge} onClick={openDialog}>
          <NomadBadge level={nomadBadgeLevel!} />
        </span>
      )

      return (
        <>
          {hasTooltip && (
            <Tooltip
              content={
                <FormattedMessage
                  defaultMessage="Badge Name"
                  id="iIa+u8"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              }
              placement="top"
            >
              {Content}
            </Tooltip>
          )}

          {!hasTooltip && Content}
        </>
      )
    }}
  </BadgeNomadDialog>
)
