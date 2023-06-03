import classNames from 'classnames'
import gql from 'graphql-tag'
import throttle from 'lodash/throttle'
import { useContext, useEffect, useRef, useState } from 'react'

import { TEST_ID } from '~/common/enums'
import styles from '~/common/styles/utils/content.article.css'
import {
  captureClicks,
  dom,
  initAudioPlayers,
  optimizeEmbed,
} from '~/common/utils'
import { useMutation, ViewerContext } from '~/components'
import { ContentArticleFragment, ReadArticleMutation } from '~/gql/graphql'

const READ_ARTICLE = gql`
  mutation ReadArticle($id: ID!) {
    readArticle(input: { id: $id }) {
      id
    }
  }
`

const Content = ({
  article,
  content,
  translating,
}: {
  article: ContentArticleFragment
  content: string
  translating?: boolean
}) => {
  const viewer = useContext(ViewerContext)
  const [read] = useMutation<ReadArticleMutation>(READ_ARTICLE, undefined, {
    showToast: false,
  })

  const contentContainer = useRef(null)

  // idle timer
  const [lastScroll, setScrollTime] = useState(0)

  const { id } = article

  // called only once
  useEffect(() => {
    initAudioPlayers()

    const handleScroll = throttle(() => setScrollTime(Date.now() / 1000), 3000)
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
          read({ variables: { id } })
        }

        // if visitor, invoke ReadArticle mutation only once
        if (!viewer.isAuthed && !visitorReadRef.current) {
          read({ variables: { id } })
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

  // fallback image
  useEffect(() => {
    const $imgs = Array.from(
      dom.$$('.u-content picture img')
    ) as HTMLImageElement[]

    const onError = (event: ErrorEvent) => {
      const $img = event.target as HTMLImageElement
      const $figure = $img.parentElement?.parentElement
      const $fig = $figure?.querySelector('figcaption')

      if (!$figure) {
        return
      }

      $figure.innerHTML = `
        <img src=${$img.src} />
        ${$fig?.outerHTML}
      `
    }

    $imgs.forEach(($img) =>
      $img.addEventListener('error', onError, { once: true })
    )

    return () =>
      $imgs.forEach(($img) => $img.removeEventListener('error', onError))
  }, [article.id])

  return (
    <>
      <div
        className={classNames({ 'u-content': true, translating })}
        dangerouslySetInnerHTML={{
          __html: optimizeEmbed(content),
        }}
        onClick={captureClicks}
        ref={contentContainer}
        data-test-id={TEST_ID.ARTICLE_CONTENT}
      />
    </>
  )
}

Content.fragments = {
  article: gql`
    fragment ContentArticle on Article {
      id
      content
    }
  `,
}

export default Content
