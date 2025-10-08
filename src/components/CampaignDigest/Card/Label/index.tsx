import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { CampaignDigestCardCampaignFragment } from '~/gql/graphql'

import styles from './styles.module.css'

type LabelProps = {
  campaign: CampaignDigestCardCampaignFragment
}

const Label = ({ campaign }: LabelProps) => {
  const { start: applyStart } = campaign.applicationPeriod || {}
  const { start: writingStart } = campaign.writingPeriod || {}

  const now = new Date()
  const isInWritingPeriod = now >= new Date(writingStart)
  const isInApplyPeriod = !isInWritingPeriod && now >= new Date(applyStart)

  const labelClasses = classNames({
    [styles.label]: true,
    [styles.registering]: isInApplyPeriod,
    [styles.inProgress]: isInWritingPeriod,
  })

  return (
    <>
      {isInApplyPeriod && (
        <span className={labelClasses}>
          <FormattedMessage
            defaultMessage="Registering"
            id="RlqC+9"
            description="src/components/CampaignDigest/Card/Label/index.tsx"
          />
        </span>
      )}
      {isInWritingPeriod && (
        <span className={labelClasses}>
          <FormattedMessage
            defaultMessage="In Progress"
            id="OO72bT"
            description="src/components/CampaignDigest/Card/Label/index.tsx"
          />
        </span>
      )}
    </>
  )
}

export default Label
