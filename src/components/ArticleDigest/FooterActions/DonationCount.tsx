import { gql } from '@apollo/client'
import _get from 'lodash/get'

import { Button, IconDonate24, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'

import { DonationCountArticle } from './__generated__/DonationCountArticle'

interface ResponseCountProps {
  article: DonationCountArticle
}

const fragments = {
  article: gql`
    fragment DonationCountArticle on Article {
      id
      transactionsReceivedBy(input: { first: 0, purpose: donation }) {
        totalCount
      }
    }
  `,
}

const DonationCount = ({ article }: ResponseCountProps) => {
  return (
    <Button spacing={['xtight', 'xtight']} is="span">
      <TextIcon icon={<IconDonate24 />} weight="md" spacing="xtight" size="sm">
        {article.transactionsReceivedBy.totalCount > 0
          ? numAbbr(article.transactionsReceivedBy.totalCount)
          : undefined}
      </TextIcon>
    </Button>
  )
}

DonationCount.fragments = fragments

export default DonationCount
