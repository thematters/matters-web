import { useIntl } from 'react-intl'

import IconReadingTime from '@/public/static/icons/24px/reading-time.svg'
import { numAbbr, numRound } from '~/common/utils'
import { Icon, TextIcon, Translate } from '~/components'
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
    <TextIcon
      icon={<Icon icon={IconReadingTime} size={18} />}
      size={12}
      color="grey"
      aria-label={intl.formatMessage({
        defaultMessage: 'Accumulated read time',
        id: 'U7o9Ba',
      })}
    >
      {numAbbr(readHour, 1)}{' '}
      <Translate zh_hant="小時" zh_hans="小时" en="hours" />
    </TextIcon>
  )
}

ReadTime.fragments = fragments

export default ReadTime
