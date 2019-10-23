import gql from 'graphql-tag'
import jump from 'jump.js'
import { MouseEventHandler } from 'react'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, dom, numAbbr } from '~/common/utils'
import ICON_COMMENT_REGULAR from '~/static/icons/comment-regular.svg?sprite'

import { CommentButtonArticle } from './__generated__/CommentButtonArticle'

const fragments = {
  article: gql`
    fragment CommentButtonArticle on Article {
      id
      live
      commentCount
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
    <button type="button" aria-label="查看評論" onClick={onClick}>
      <TextIcon
        icon={
          <Icon
            size="default"
            id={ICON_COMMENT_REGULAR.id}
            viewBox={ICON_COMMENT_REGULAR.viewBox}
          />
        }
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

const CommentButton = ({
  article,
  textPlacement = 'right'
}: {
  article: CommentButtonArticle
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
      text={numAbbr(article.commentCount || 0)}
      textPlacement={textPlacement}
    />
  )
}

CommentButton.fragments = fragments

export default CommentButton
