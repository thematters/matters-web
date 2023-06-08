import { numAbbr } from '~/common/utils'
import { IconDonate24, TextIcon } from '~/components'
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
      <TextIcon icon={<IconDonate24 size="xs" />} size="xs" color="greyDark">
        {article.transactionsReceivedBy.totalCount > 0
          ? numAbbr(article.transactionsReceivedBy.totalCount)
          : undefined}
      </TextIcon>
    </>
  )
}

DonationCount.fragments = fragments

export default DonationCount
