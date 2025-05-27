import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useIntl } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import { URL_FRAGMENT } from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'
import { Button, Icon, TextIcon } from '~/components'
import { ActionsResponseCountArticleFragment } from '~/gql/graphql'

interface ResponseCountProps {
  article: ActionsResponseCountArticleFragment
}

const fragments = {
  article: gql`
    fragment ActionsResponseCountArticle on Article {
      id
      slug
      articleState: state
      shortHash
      responseCount
      author {
        userName
      }
    }
  `,
}

const ResponseCount = ({ article }: ResponseCountProps) => {
  const intl = useIntl()

  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    fragment: URL_FRAGMENT.COMMENTS,
  })
  const isBanned = state === 'banned'

  return (
    <Button
      spacing={[8, 8]}
      bgActiveColor="greyLighterActive"
      {...path}
      disabled={isBanned}
      aria-label={intl.formatMessage({
        defaultMessage: 'View responses',
        id: 'SFsQ1E',
      })}
    >
      <TextIcon
        icon={<Icon icon={IconComment} />}
        color="grey"
        weight="medium"
        size={14}
      >
        {article.responseCount > 0 ? numAbbr(article.responseCount) : undefined}
      </TextIcon>
    </Button>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
