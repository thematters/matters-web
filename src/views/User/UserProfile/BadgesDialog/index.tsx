import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import {
  OPEN_GRAND_BADGE_DIALOG,
  OPEN_NOMAD_BADGE_DIALOG,
  URL_USER_PROFILE,
} from '~/common/enums'
import {
  Button,
  Dialog,
  Icon,
  useDialogSwitch,
  useEventListener,
  useRoute,
} from '~/components'

import BadgeGrandContent from '../BadgeGrandDialog/Content'
import BadgeNomadDialogContent from '../BadgeNomadDialog/Content'
import { Badges, BadgesOptions } from '../Badges'

type Step = 'badges' | 'nomad' | 'grand'

interface BadgesDialogProps extends BadgesOptions {
  children: ({
    openDialog,
  }: {
    openDialog: (step?: Step) => void
  }) => React.ReactNode
}

export const BaseBadgesDialog = ({
  children,
  hasNomadBadge,
  nomadBadgeLevel,
  hasTraveloggersBadge,
  hasGrandBadge,
  hasSeedBadge,
  hasGoldenMotorBadge,
  hasArchitectBadge,
  isCivicLiker,
}: BadgesDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const { getQuery } = useRoute()

  const initNomad =
    getQuery(URL_USER_PROFILE.OPEN_NOMAD_BADGE_DIALOG.key) ===
    URL_USER_PROFILE.OPEN_NOMAD_BADGE_DIALOG.value
  const initGrand =
    getQuery(URL_USER_PROFILE.OPEN_GRAND_BADGE_DIALOG.key) ===
    URL_USER_PROFILE.OPEN_GRAND_BADGE_DIALOG.value
  const initStep = initGrand ? 'grand' : initNomad ? 'nomad' : 'badges'
  const [step, setStep] = useState<Step>(initStep)

  const isInBadgesStep = step === 'badges'
  const isInNomadStep = step === 'nomad'
  const isInGrandStep = step === 'grand'

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {isInBadgesStep && (
          <>
            <Dialog.Header
              title={
                <FormattedMessage
                  defaultMessage="Badges"
                  id="DYrDcG"
                  description="src/components/UserProfile/index.tsx"
                />
              }
              titleLeft
              rightBtn={
                <Button
                  onClick={closeDialog}
                  textColor="greyDarker"
                  textActiveColor="black"
                >
                  <Icon icon={IconTimes} size={20} />
                </Button>
              }
            />
            <Dialog.Content>
              <Badges
                isInDialog
                hasNomadBadge={hasNomadBadge}
                nomadBadgeLevel={nomadBadgeLevel}
                hasGrandBadge={hasGrandBadge}
                hasTraveloggersBadge={hasTraveloggersBadge}
                hasSeedBadge={hasSeedBadge}
                hasGoldenMotorBadge={hasGoldenMotorBadge}
                hasArchitectBadge={hasArchitectBadge}
                isCivicLiker={isCivicLiker}
                gotoNomadBadge={() => setStep('nomad')}
                gotoGrandBadge={() => setStep('grand')}
              />
            </Dialog.Content>

            <Dialog.Footer
              btns={
                <div aria-hidden style={{ opacity: 0 }}>
                  <Dialog.RoundedButton text="" />
                </div>
              }
              smUpBtns={
                <Dialog.TextButton
                  text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                  color="greyDarker"
                  onClick={closeDialog}
                />
              }
            />
          </>
        )}
        {isInNomadStep && !!nomadBadgeLevel && (
          <BadgeNomadDialogContent
            nomadBadgeLevel={nomadBadgeLevel}
            closeDialog={closeDialog}
            goBack={() => setStep('badges')}
          />
        )}
        {isInGrandStep && (
          <BadgeGrandContent
            closeDialog={closeDialog}
            goBack={() => setStep('badges')}
          />
        )}
      </Dialog>
    </>
  )
}

export const BadgesDialog = (props: BadgesDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_NOMAD_BADGE_DIALOG, openDialog)
    useEventListener(OPEN_GRAND_BADGE_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }
  return (
    <Dialog.Lazy mounted={<BaseBadgesDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
