import { FormattedMessage } from 'react-intl'

import { numAbbr, numRound } from '~/common/utils'
import {
  IconDotDivider,
  IconReadTimeTotal16,
  TextIcon,
} from '~/components'
import { ActionsReadTimeArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'

interface ResponseCountProps {
  article: ActionsReadTimeArticleFragment
  hasDivider: boolean
}

const ReadTime = ({ article, hasDivider }: ResponseCountProps) => {
  if (!article.readTime) {
    return null
  }

  const readHour = numRound(article.readTime / 60 / 60, 1)

  if (article.readTime <= 0 || readHour <= 0) {
    return null
  }

  return (
    <>
      <button type="button">
        <TextIcon icon={<IconReadTimeTotal16 />} size="xs" color="grey-dark">
          {numAbbr(readHour, 1)}{' '}
          <FormattedMessage defaultMessage="hours" description="src/components/ArticleDigest/Feed/FooterActions/ReadTime/index.tsx" />
        </TextIcon>
      </button>

      {hasDivider && <IconDotDivider />}
    </>
  )
}

ReadTime.fragments = fragments

export default ReadTime
