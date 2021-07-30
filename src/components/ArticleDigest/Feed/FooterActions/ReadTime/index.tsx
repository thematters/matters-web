import { IconDotDivider, IconReadTime12, TextIcon } from '~/components'
import { Translate } from '~/components/Context'

import { numAbbr, numRound } from '~/common/utils'

import { fragments } from './gql'

import { ActionsReadTimeArticle } from './__generated__/ActionsReadTimeArticle'

interface ResponseCountProps {
  article: ActionsReadTimeArticle
  hasDate: boolean
}

const ResponseCount = ({ article, hasDate }: ResponseCountProps) => {
  if (!article.readTime) {
    return null
  }

  const readHour = numRound(article.readTime / 60 / 60, 1)

  if (article.readTime <= 0 || readHour <= 0) {
    return null
  }

  return (
    <>
      <TextIcon icon={<IconReadTime12 size="xs" />} size="xs" color="grey-dark">
        {numAbbr(readHour, 1)}{' '}
        <Translate zh_hant="小時" zh_hans="小时" en="hours" />
      </TextIcon>

      {hasDate && <IconDotDivider />}
    </>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
