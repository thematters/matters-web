import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Button, IconComment16, TextIcon } from '~/components'

import { URL_FRAGMENT } from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'

import { ActionsResponseCountArticle } from './__generated__/ActionsResponseCountArticle'

interface ResponseCountProps {
  article: ActionsResponseCountArticle
}

const fragments = {
  article: gql`
    fragment ActionsResponseCountArticle on Article {
      id
      slug
      articleState: state
      mediaHash
      responseCount
      author {
        userName
      }
    }
  `,
}

const ResponseCount = ({ article }: ResponseCountProps) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    fragment: URL_FRAGMENT.COMMENTS,
  })
  const isBanned = state === 'banned'

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor="grey-lighter-active"
      {...path}
      disabled={isBanned}
      aira-label="查看評論"
    >
      <TextIcon icon={<IconComment16 />} color="grey" weight="md" size="sm">
        {article.responseCount > 0 ? numAbbr(article.responseCount) : undefined}
      </TextIcon>
    </Button>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
