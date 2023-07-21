import { useIntl } from 'react-intl'

import { numAbbr, numRound } from '~/common/utils'
import { IconReadTime18, TextIcon, Translate } from '~/components'
import { ActionsReadTimeArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'

interface ResponseCountProps {
  article: ActionsReadTimeArticleFragment
}

const ReadTime = ({ article }: ResponseCountProps) => {
  const intl = useIntl()

  if (!article.readTime) {
    return null
  }

  const readHour = numRound(article.readTime / 60 / 60, 1)

  if (article.readTime <= 0 || readHour <= 0) {
    return null
  }

  return (
    <button
      type="button"
      title={intl.formatMessage({
        defaultMessage: 'Accumulated read time',
      })}
    >
      <TextIcon icon={<IconReadTime18 size="mdXS" />} size="xs" color="grey">
        {numAbbr(readHour, 1)}{' '}
        <Translate zh_hant="小時" zh_hans="小时" en="hours" />
      </TextIcon>
    </button>
  )
}

ReadTime.fragments = fragments

export default ReadTime
