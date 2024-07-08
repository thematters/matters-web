import { ReactComponent as IconCheck } from '@/public/static/icons/24px/check.svg'
import { Button, Icon, TextIcon } from '~/components'
import { ApplyCampaignPrivateFragment } from '~/gql/graphql'

const ApplyCampaignButton = ({
  campaign,
  size,
  onClick,
}: {
  campaign: ApplyCampaignPrivateFragment
  size: 'lg' | 'sm'
  onClick: () => void
}) => {
  const now = new Date()
  const isInApplicationPeriod =
    !campaign.applicationPeriod.end ||
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
      <TextIcon
        icon={<Icon icon={IconCheck} size={16} />}
        color={isInApplicationPeriod ? 'green' : 'black'}
      >
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
      <Button
        size={['100%', '3rem']}
        disabled={isPending}
        borderWidth="sm"
        borderColor={isInApplicationPeriod ? 'green' : 'black'}
        bgColor={isInApplicationPeriod && isNotApplied ? 'green' : undefined}
      >
        <TextIcon
          icon={isPending ? <Icon icon={IconCheck} size={20} /> : null}
          size={16}
          color={
            isInApplicationPeriod ? (isNotApplied ? 'white' : 'green') : 'black'
          }
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
        disabled={isPending}
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

export default ApplyCampaignButton
