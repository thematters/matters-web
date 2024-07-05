import gql from 'graphql-tag'

import { ReactComponent as IconCheck } from '@/public/static/icons/24px/check.svg'
import { Button, Dialog, Icon, TextIcon } from '~/components'
import { MOCK_CAMPAIGN } from '~/stories/mocks'

const ApplyButton = ({
  campaign,
  size,
  onClick,
}: {
  campaign: typeof MOCK_CAMPAIGN
  size: 'lg' | 'sm'
  onClick: () => void
}) => {
  const now = new Date()
  const isInApplicationPeriod =
    new Date(campaign.applicationPeriod.start) < now &&
    now < new Date(campaign.applicationPeriod.end)
  const applicationState = campaign.applicationState
  const isSucceeded = applicationState === 'succeeded'
  const isPending = applicationState === 'pending'
  const isRejected = applicationState === 'rejected'
  const isNotApplied = !applicationState

  /**
   * Rejected
   */
  if (isRejected) {
    return null
  }

  /**
   * Succeeded
   */
  if (isSucceeded) {
    return (
      <TextIcon icon={<Icon icon={IconCheck} size={16} />} color="green">
        {isInApplicationPeriod ? '報名成功' : '陪跑成功'}
      </TextIcon>
    )
  }

  /**
   * Pending or not applied
   */
  let text = ''
  if (isPending) {
    text = isInApplicationPeriod ? '報名審核中' : '陪跑審核中'
  } else if (isNotApplied) {
    text = isInApplicationPeriod ? '報名參加' : '陪跑參加'
  }

  if (size === 'lg') {
    return (
      <Dialog.RoundedButton
        text={text}
        color={isInApplicationPeriod ? 'green' : 'black'}
        icon={isPending ? <Icon icon={IconCheck} size={20} /> : null}
        onClick={onClick}
      />
    )
  } else {
    return (
      <Button
        onClick={onClick}
        size={[null, '1.875rem']}
        spacing={[0, 20]}
        textColor={isInApplicationPeriod ? 'white' : 'black'}
        bgColor={isInApplicationPeriod ? 'green' : undefined}
        borderColor={isInApplicationPeriod ? undefined : 'greyLight'}
      >
        <TextIcon
          spacing={4}
          size={14}
          icon={isPending ? <Icon icon={IconCheck} size={16} /> : null}
        >
          {text}
        </TextIcon>
      </Button>
    )
  }
}

ApplyButton.fragments = gql`
  fragment ApplyCampaignPrivate on Campaign {
    id
    applicationState
  }
`

export default ApplyButton
