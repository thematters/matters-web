import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCheck } from '@/public/static/icons/24px/check.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Button, Icon, TextIcon, ViewerContext } from '~/components'
import {
  ApplyCampaignPrivateFragment,
  ApplyCampaignPublicFragment,
} from '~/gql/graphql'

type ApplyCampaignButtonProps = {
  campaign: ApplyCampaignPublicFragment & Partial<ApplyCampaignPrivateFragment>
  size: 'lg' | 'sm'
  onClick: () => void
}

const ApplyCampaignButton = ({
  campaign,
  size,
  onClick,
}: ApplyCampaignButtonProps) => {
  const viewer = useContext(ViewerContext)
  const now = new Date()
  const { start: appStart, end: appEnd } = campaign.applicationPeriod || {}
  const isInApplicationPeriod = !appEnd || now < new Date(appEnd)
  const applicationState = campaign.application?.state
  const appliedAt = campaign.application?.createdAt
  const isSucceeded = applicationState === 'succeeded'
  const isPending = applicationState === 'pending'
  const isRejected = applicationState === 'rejected'
  const isNotApplied = !applicationState
  const isAppliedDuringPeriod =
    appliedAt && new Date(appliedAt) <= new Date(appEnd)
  const isApplicationStarted = now >= new Date(appStart)
  const isActiveCampaign = campaign.state === 'active'

  /**
   * Rejected or inactive
   */
  if (isRejected || !isActiveCampaign) {
    return null
  }

  /**
   * Pending, not applied or succeeded
   */
  let text: React.ReactNode = ''
  if (isPending) {
    text = isInApplicationPeriod ? (
      <FormattedMessage
        defaultMessage="Reviewing..."
        description="type:apply"
        id="jLkKbI"
      />
    ) : (
      <FormattedMessage
        defaultMessage="Reviewing..."
        description="type:join"
        id="Pq/7m5"
      />
    )
  } else if (isNotApplied) {
    text = isInApplicationPeriod ? (
      <FormattedMessage
        defaultMessage="Apply"
        description="src/views/CampaignDetail/Apply/Button/index.tsx"
        id="HgY+72"
      />
    ) : (
      <FormattedMessage
        defaultMessage="Join"
        description="src/views/CampaignDetail/Apply/Button/index.tsx"
        id="gCafm/"
      />
    )
  } else if (isSucceeded) {
    text = isAppliedDuringPeriod ? (
      <FormattedMessage defaultMessage="Applied successfully" id="4nHH2x" />
    ) : (
      <FormattedMessage defaultMessage="Joined successfully" id="al5/yQ" />
    )
  }

  if (!viewer.isAuthed) {
    onClick = () => {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.replyComment },
        })
      )
    }
  }

  const primary =
    isInApplicationPeriod || (isSucceeded && isAppliedDuringPeriod)
  const isLateSucceeded = !isAppliedDuringPeriod && isSucceeded
  const bgColor = primary ? 'green' : undefined
  const borderColor = primary ? 'green' : isLateSucceeded ? 'grey' : 'green'
  const textColor = primary ? 'white' : isLateSucceeded ? 'grey' : 'green'

  if (size === 'lg') {
    return (
      <Button
        onClick={onClick}
        size={['100%', '3rem']}
        disabled={isPending || !isApplicationStarted || isSucceeded}
        borderWidth="sm"
        borderColor={borderColor}
        bgColor={bgColor}
      >
        <TextIcon
          icon={isSucceeded ? <Icon icon={IconCheck} size={20} /> : null}
          size={16}
          color={textColor}
          weight="normal"
          placement="right"
        >
          {text}
        </TextIcon>
      </Button>
    )
  } else {
    return (
      <Button
        onClick={onClick}
        size={[null, '1.875rem']}
        spacing={[0, 20]}
        borderWidth="sm"
        disabled={isPending || !isApplicationStarted || isSucceeded}
        bgColor={bgColor}
        borderColor={borderColor}
      >
        <TextIcon
          spacing={4}
          size={14}
          icon={isSucceeded ? <Icon icon={IconCheck} size={16} /> : null}
          color={textColor}
        >
          {text}
        </TextIcon>
      </Button>
    )
  }
}

export default ApplyCampaignButton
