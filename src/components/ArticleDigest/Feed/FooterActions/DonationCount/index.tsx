import { useIntl } from 'react-intl'

import { ReactComponent as IconMoney } from '@/public/static/icons/24px/money.svg'
import { numAbbr } from '~/common/utils'
import { Icon, TextIcon } from '~/components'
import { ActionsDonationCountArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'

interface DonationCountProps {
  article: ActionsDonationCountArticleFragment
}

const DonationCount = ({ article }: DonationCountProps) => {
  const intl = useIntl()
  const count = article.donations.totalCount

  if (!count) {
    return null
  }

  return (
    <TextIcon
      icon={<Icon icon={IconMoney} size="mdXS" />}
      size="xs"
      color="grey"
      aria-label={intl.formatMessage({
        defaultMessage: 'Donation count',
        id: 'DP3yqI',
      })}
    >
      {count > 0 ? numAbbr(count) : undefined}
    </TextIcon>
  )
}

DonationCount.fragments = fragments

export default DonationCount
