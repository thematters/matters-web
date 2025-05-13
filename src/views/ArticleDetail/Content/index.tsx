import classNames from 'classnames'
import gql from 'graphql-tag'
import _throttle from 'lodash/throttle'
import { useContext, useEffect, useRef, useState } from 'react'

import { TEST_ID } from '~/common/enums'
import { captureClicks, initAudioPlayers, optimizeEmbed } from '~/common/utils'
import {
  Media,
  TextSelectionPopover,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import { useReadTimer } from '~/components/Hook'
import { ReadArticleMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const READ_ARTICLE = gql`
  mutation ReadArticle($id: ID!) {
    readArticle(input: { id: $id }) {
      id
    }
  }
`

const Content = ({
  articleId,
  content,
  indentFirstLine,
}: {
  articleId: string
  content: string
  indentFirstLine: boolean
}) => {
  const viewer = useContext(ViewerContext)
  const [read] = useMutation<ReadArticleMutation>(READ_ARTICLE, undefined, {
    showToast: false,
  })

  const contentContainer = useRef<HTMLDivElement>(null)

  const { isInPath } = useRoute()
  const isInArticleDetailHistory = isInPath('ARTICLE_DETAIL_HISTORY')

  // idle timer
  const [lastScroll, setScrollTime] = useState(0)

  // called only once
  useEffect(() => {
    initAudioPlayers()

    const handleScroll = _throttle(() => setScrollTime(Date.now() / 1000), 3000)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // visitor read flag
  const visitorReadRef = useRef(false)

  // register read
  useEffect(() => {
    const timerId = setInterval(
      (function heartbeat() {
        const isReading = () => {
          // tab hidden
          if (document.hidden) {
            return false
          }

          // idle for more than 5 minutes
          if (Date.now() / 1000 - lastScroll > 60 * 5) {
            return false
          }

          if (!contentContainer || !contentContainer.current) {
            return false
          }

          // if overlay is shown
          const overlaySelectors = ['reach-portal', '.tippy-popper']
          if (document.querySelector(overlaySelectors.join(','))) {
            return false
          }

          // if bottom is above center
          const { bottom } = (
            contentContainer.current as unknown as Element
          ).getBoundingClientRect()

          const isBottomAboveCenter = bottom <= window.innerHeight / 2
          return !isBottomAboveCenter
        }

        // if user is logged in, ReadArticle mutation will be invoked multiple times
        if (viewer.isAuthed && isReading()) {
          read({ variables: { id: articleId } })
        }

        // if visitor, invoke ReadArticle mutation only once
        if (!viewer.isAuthed && !visitorReadRef.current) {
          read({ variables: { id: articleId } })
          visitorReadRef.current = true
        }
        return heartbeat
      })(),
      5000
    )

    // clean timer
    return () => {
      clearInterval(timerId)
    }
  }, [lastScroll])

  useReadTimer({ container: contentContainer })

  return (
    <>
      <div
        className={classNames({
          'u-content-article': true,
          [styles.indented]: indentFirstLine,
        })}
        dangerouslySetInnerHTML={{
          __html: optimizeEmbed(content),
        }}
        onClick={captureClicks}
        ref={contentContainer}
        data-test-id={TEST_ID.ARTICLE_CONTENT}
      />
      <Media greaterThan="sm">
        {!isInArticleDetailHistory && contentContainer.current && (
          <TextSelectionPopover
            targetElement={contentContainer.current as HTMLElement}
          />
        )}
      </Media>
    </>
  )
}

export default Content
