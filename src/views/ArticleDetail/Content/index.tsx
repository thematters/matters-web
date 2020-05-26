import classNames from 'classnames'
import gql from 'graphql-tag'
import throttle from 'lodash/throttle'
import { useEffect, useRef, useState } from 'react'

import { useMutation } from '~/components/GQL'

import styles from '~/common/styles/utils/content.article.css'
import { captureClicks, initAudioPlayers } from '~/common/utils'

import { ContentArticle } from './__generated__/ContentArticle'
import { ReadArticle } from './__generated__/ReadArticle'

const READ_ARTICLE = gql`
  mutation ReadArticle($id: ID!) {
    readArticle(input: { id: $id }) {
      id
    }
  }
`

const Content = ({
  article,
  translation,
  translating,
}: {
  article: ContentArticle
  translation?: string
  translating: boolean
}) => {
  const [read] = useMutation<ReadArticle>(READ_ARTICLE)

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

  // register read
  useEffect(() => {
    const timerId = setInterval(() => {
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
        const {
          bottom,
        } = ((contentContainer.current as unknown) as Element).getBoundingClientRect()

        const isBottomAboveCenter = bottom <= window.innerHeight / 2
        return !isBottomAboveCenter
      }

      if (isReading()) {
        read({ variables: { id } })
      }
    }, 5000)

    // clean timer
    return () => {
      clearInterval(timerId)
    }
  }, [lastScroll])

  return (
    <>
      <div
        className={classNames({ 'u-content': true, translating })}
        dangerouslySetInnerHTML={{
          __html: translation || article.content,
        }}
        onClick={captureClicks}
        ref={contentContainer}
      />

      <style jsx>{styles}</style>
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
