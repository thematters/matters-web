import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Button, Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, UrlFragments } from '~/common/enums'
import { analytics, numAbbr, toPath } from '~/common/utils'

import { ActionsResponseCountArticle } from './__generated__/ActionsResponseCountArticle'

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
  `
}

const ResponseCount = ({
  article,
  size = 'sm'
}: {
  article: ActionsResponseCountArticle
  size?: 'sm' | 'xs'
}) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    fragment: UrlFragments.COMMENTS
  })
  const isBanned = state === 'banned'

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgHoverColor="grey-lighter"
      {...path}
      disabled={isBanned}
      onClick={() => {
        analytics.trackEvent(ANALYTICS_EVENTS.OPEN_COMMENTS, {
          entrance: article.id,
          type: 'article-digest'
        })
      }}
      aira-label="查看評論"
    >
      <TextIcon
        icon={<Icon.Comment size={size === 'xs' ? 'xs' : undefined} />}
        color="grey"
        weight="md"
        size={size}
      >
        {article.responseCount > 0 ? numAbbr(article.responseCount) : undefined}
      </TextIcon>
    </Button>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
