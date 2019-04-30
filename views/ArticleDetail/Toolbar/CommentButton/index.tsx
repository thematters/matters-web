import gql from 'graphql-tag'
import _get from 'lodash/get'
import { MouseEventHandler, useEffect } from 'react'

import { Icon, TextIcon } from '~/components'
import { DrawerConsumer } from '~/components/Drawer'

import { ANALYTICS_EVENTS, UrlFragments } from '~/common/enums'
import { analytics, numAbbr } from '~/common/utils'
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
  effect,
  text,
  textPlacement
}: {
  onClick: MouseEventHandler
  effect: () => (() => void) | void
  text: string
  textPlacement?: 'bottom' | 'right'
}) => {
  useEffect(effect, [process.browser && window.location.pathname])

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
    <DrawerConsumer>
      {({ opened, open, close }) => (
        <ButtonWithEffect
          onClick={() => {
            if (opened) {
              close()
            } else {
              open()
              analytics.trackEvent(ANALYTICS_EVENTS.OPEN_COMMENTS, {
                entrance: article.id,
                type: 'article-detail'
              })
            }
          }}
          effect={() => {
            if (
              process.browser &&
              window.location.hash === `#${UrlFragments.COMMENTS}`
            ) {
              open()
            }
          }}
          text={numAbbr(_get(article, 'commentCount', 0))}
          textPlacement={textPlacement}
        />
      )}
    </DrawerConsumer>
  )
}

CommentButton.fragments = fragments

export default CommentButton
