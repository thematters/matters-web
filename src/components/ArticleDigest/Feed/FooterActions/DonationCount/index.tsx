import { numAbbr } from '~/common/utils'
import { IconDonate18, TextIcon } from '~/components'
import { ActionsDonationCountArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'

interface DonationCountProps {
  article: ActionsDonationCountArticleFragment
}

const DonationCount = ({ article }: DonationCountProps) => {
  if (!article.transactionsReceivedBy.totalCount) {
    return null
  }

  return (
    <>
      <TextIcon icon={<IconDonate18 size="mdXS" />} size="xs" color="grey">
        {article.transactionsReceivedBy.totalCount > 0
          ? numAbbr(article.transactionsReceivedBy.totalCount)
          : undefined}
      </TextIcon>
    </>
  )
}

DonationCount.fragments = fragments

export default DonationCount
