import gql from 'graphql-tag'
import jump from 'jump.js'
import { MouseEventHandler } from 'react'

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

const ButtonWithEffect = ({
  onClick,
  text,
  textPlacement
}: {
  onClick: MouseEventHandler
  text: string
  textPlacement?: 'bottom' | 'right'
}) => {
  return (
    <button type="button" aria-label="查看回應" onClick={onClick}>
      <TextIcon
        icon={<Icon.CommentRegular />}
        color="grey"
        weight="medium"
        text={text}
        textPlacement={textPlacement}
        size="xs"
        spacing={textPlacement === 'bottom' ? 'xxxtight' : 'xxtight'}
      />
    </button>
  )
}

const ResponseButton = ({
  article,
  textPlacement = 'right'
}: {
  article: ResponseButtonArticle
  textPlacement?: 'bottom' | 'right'
}) => {
  return (
    <ButtonWithEffect
      onClick={() => {
        const element = dom.$('#comments')
        if (element) {
          jump('#comments', { offset: -10 })
        }

        analytics.trackEvent(ANALYTICS_EVENTS.OPEN_COMMENTS, {
          entrance: article.id,
          type: 'article-detail'
        })
      }}
      text={numAbbr(article.responseCount || 0)}
      textPlacement={textPlacement}
    />
  )
}

ResponseButton.fragments = fragments

export default ResponseButton
