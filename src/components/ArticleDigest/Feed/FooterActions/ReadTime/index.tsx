import { IconDotDivider, IconReadTimeTotal16, TextIcon } from '~/components'
import { Translate } from '~/components/Context'

import { numAbbr, numRound } from '~/common/utils'

import { fragments } from './gql'

import { ActionsReadTimeArticle } from './__generated__/ActionsReadTimeArticle'

interface ResponseCountProps {
  article: ActionsReadTimeArticle
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
      <TextIcon icon={<IconReadTimeTotal16 />} size="xs" color="grey-dark">
        {numAbbr(readHour, 1)}{' '}
        <Translate zh_hant="小時" zh_hans="小时" en="hours" />
      </TextIcon>

      {hasDivider && <IconDotDivider />}
    </>
  )
}

ReadTime.fragments = fragments

export default ReadTime
