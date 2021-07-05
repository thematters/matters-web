import { IconDotDivider, IconReadTime12, TextIcon } from '~/components'

import { numAbbr, numRound } from '~/common/utils'

import { Translate } from '@/src/components/Context'

import { fragments } from './gql'

import { ActionsReadTimeArticle } from './__generated__/ActionsReadTimeArticle'

interface ResponseCountProps {
  article: ActionsReadTimeArticle
}

const ResponseCount = ({ article }: ResponseCountProps) => {
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

      <IconDotDivider />
    </>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
