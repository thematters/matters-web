import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { Button, Dialog, Icon, useDialogSwitch } from '~/components'

import BadgeGrandSlamContent from '../BadgeGrandSlamDialog/Content'
import BadgeNomadDialogContent from '../BadgeNomadDialog/Content'
import { Badges, BadgesOptions } from '../Badges'

type Step = 'badges' | 'nomad' | 'grandSlam'
interface BadgesDialogProps extends BadgesOptions {
  children: ({
    openDialog,
  }: {
    openDialog: (step?: Step) => void
  }) => React.ReactNode
  step?: Step
}

export const BaseBadgesDialog = ({
  children,
  hasNomadBadge,
  nomadBadgeLevel,
  hasTraveloggersBadge,
  hasGrandSlamBadge,
  hasSeedBadge,
  hasGoldenMotorBadge,
  hasArchitectBadge,
  isCivicLiker,
  shareLink,
  step: initStep = 'badges',
}: BadgesDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const [step, setStep] = useState<Step>(initStep)
  const isInBadgesStep = step === 'badges'
  const isInNomadStep = step === 'nomad'
  const isInGrandSlamStep = step === 'grandSlam'

  const openStepDialog = (step?: Step) => {
    if (step) {
      setStep(step)
    }
    openDialog()
  }

  return (
    <>
      {children({ openDialog: openStepDialog })}

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
                hasGrandSlamBadge={hasGrandSlamBadge}
                hasTraveloggersBadge={hasTraveloggersBadge}
                hasSeedBadge={hasSeedBadge}
                hasGoldenMotorBadge={hasGoldenMotorBadge}
                hasArchitectBadge={hasArchitectBadge}
                isCivicLiker={isCivicLiker}
                shareLink={shareLink}
                gotoNomadBadge={() => setStep('nomad')}
                gotoGrandSlamBadge={() => setStep('grandSlam')}
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
            closeDialog={closeDialog}
            isNested
            nomadBadgeLevel={nomadBadgeLevel}
            shareLink={shareLink}
            goBack={() => setStep('badges')}
          />
        )}
        {isInGrandSlamStep && (
          <BadgeGrandSlamContent
            closeDialog={closeDialog}
            isNested
            goBack={() => setStep('badges')}
          />
        )}
      </Dialog>
    </>
  )
}

export const BadgesDialog = (props: BadgesDialogProps) => {
  const Children = ({ openDialog }: { openDialog: (step?: Step) => void }) => {
    return <>{props?.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseBadgesDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
