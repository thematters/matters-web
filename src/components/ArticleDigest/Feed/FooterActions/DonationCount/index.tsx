import { numAbbr } from '~/common/utils'
import { IconDonate24, IconDotDivider, TextIcon } from '~/components'

import { ActionsDonationCountArticle } from './__generated__/ActionsDonationCountArticle'
import { fragments } from './gql'

interface DonationCountProps {
  article: ActionsDonationCountArticle
  hasDivider: boolean
}

const DonationCount = ({ article, hasDivider }: DonationCountProps) => {
  if (!article.transactionsReceivedBy.totalCount) {
    return null
  }

  return (
    <>
      <TextIcon icon={<IconDonate24 />} size="xs" color="grey-dark">
        {article.transactionsReceivedBy.totalCount > 0
          ? numAbbr(article.transactionsReceivedBy.totalCount)
          : undefined}
      </TextIcon>

      {hasDivider && <IconDotDivider />}
    </>
  )
}

DonationCount.fragments = fragments

export default DonationCount
