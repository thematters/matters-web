import gql from 'graphql-tag'
import jump from 'jump.js'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, dom, numAbbr } from '~/common/utils'

import { ResponseButtonArticle } from './__generated__/ResponseButtonArticle'

const fragments = {
  article: gql`
    fragment ResponseButtonArticle on Article {
      id
      live
      responseCount
    }
  `
}

const ResponseButton = ({
  article,
  textPlacement = 'right'
}: {
  article: ResponseButtonArticle
  textPlacement?: 'bottom' | 'right'
}) => {
  const onClick = () => {
    const element = dom.$('#comments')
    if (element) {
      jump('#comments', { offset: -10 })
    }

    analytics.trackEvent(ANALYTICS_EVENTS.OPEN_COMMENTS, {
      entrance: article.id,
      type: 'article-detail'
    })
  }

  return (
    <button type="button" aria-label="查看回應" onClick={onClick}>
      <TextIcon
        icon={<Icon.Comment color="black" size="md-s" />}
        color="grey"
        weight="md"
        textPlacement={textPlacement}
        size="xs"
        spacing={textPlacement === 'bottom' ? 'xxxtight' : 'xxtight'}
      >
        {numAbbr(article.responseCount || 0)}
      </TextIcon>
    </button>
  )
}

ResponseButton.fragments = fragments

export default ResponseButton
