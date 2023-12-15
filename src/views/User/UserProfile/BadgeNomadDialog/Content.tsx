import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as Nomad1Background } from '@/public/static/images/badge-nomad1-background.svg'
import { ReactComponent as Nomad2Background } from '@/public/static/images/badge-nomad2-background.svg'
import { ReactComponent as Nomad3Background } from '@/public/static/images/badge-nomad3-background.svg'
import { ReactComponent as Nomad4Background } from '@/public/static/images/badge-nomad4-background.svg'
import { BREAKPOINTS } from '~/common/enums'
import {
  Button,
  CopyToClipboard,
  Dialog,
  IconArrowLeft16,
  LanguageContext,
  useMediaQuery,
} from '~/components'
import { UserLanguage } from '~/gql/graphql'

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
  const { lang } = useContext(LanguageContext)
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
  const campaignLink = process.env.NEXT_PUBLIC_NOMAD_MATTERS_CAMPAIGN_LINK
  const campaignLinkEn = process.env.NEXT_PUBLIC_NOMAD_MATTERS_CAMPAIGN_LINK_EN

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
              <IconArrowLeft16 size="mdS" />
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
                  defaultMessage="Breaking through history! The torch you've ignited will be the most dazzling support on the Nomad's journey. Congratulations on reaching the final destination of the Nomad Matters with 20 friends and earning the highest-level Firebolt badge."
                  id="p0oPHP"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              ) : nomadBadgeLevel === 3 ? (
                <FormattedMessage
                  defaultMessage="Wings have sprouted on the badge, and the halo of dreams is beginning to spin. You have gathered 10 companions on the Nomad's path. Invite another 10 fellow travelers to move towards the final destination together, where the highest level of honor awaits you."
                  id="DdVBFV"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              ) : nomadBadgeLevel === 2 ? (
                <FormattedMessage
                  defaultMessage="The dazzling light of a meteor shower is enough to illuminate the night sky. You have already invited 5 companions to participate in the Nomad Matters. Invite 5 more, and you can continue to level up!"
                  id="XfkltT"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Under the moonlight, dreams are about to come true. The Moonlight Dream badge signifies your participation in the Nomad Matters, whether as a contestant or a supporter of exceptional projects. Next, invite 5 companions to join the journey with you, and you'll earn an even higher-level badge?"
                  id="GxTjwK"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              )}
            </p>
            <p className={styles.extra}>
              <FormattedMessage
                defaultMessage="<a>About Nomad Matters</a>"
                id="znJ06J"
                values={{
                  a: (chunks) => (
                    <a
                      href={
                        (lang === UserLanguage.En
                          ? campaignLinkEn
                          : campaignLink) ||
                        campaignLink ||
                        ''
                      }
                      target="_blank"
                    >
                      {chunks}
                    </a>
                  ),
                }}
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
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
              color="greyDarker"
            />
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
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Share" id="OKhRC6" />}
                color="green"
              />
            </CopyToClipboard>
          </>
        }
      />
    </>
  )
}

export default BadgeNomadDialogContent
