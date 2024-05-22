import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import { ButtonProps, ViewerContext } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import AppreciationButton from '../../AppreciationButton'
import CommentButton from '../Button/CommentButton'
import DonationButton from '../Button/DonationButton'
import styles from './styles.module.css'

export type FloatToolbarProps = {
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  privateFetched: boolean
  lock: boolean
  show: boolean
  toggleCommentDrawer: () => void
  toggleDonationDrawer: () => void
}

const FloatToolbar = ({
  show,
  articleDetails,
  privateFetched,
  lock,
  toggleCommentDrawer,
  toggleDonationDrawer,
}: FloatToolbarProps) => {
  const viewer = useContext(ViewerContext)
  const isAuthor = viewer.id === articleDetails.author.id

  const [mounted, setMounted] = useState(false)
  const [displayContainer, setDisplayContainer] = useState(false)
  useEffect(() => {
    if (show) {
      setDisplayContainer(show)
    }
    // delay to show container to trigger animation effects
    setTimeout(() => setMounted(true))

    return () => setMounted(false)
  }, [show])

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.showContainer]: show && mounted,
  })

  const buttonProps: ButtonProps = {
    size: ['3.75rem', '2.5rem'],
    spacing: [0, 0],
    bgColor: 'white',
    textColor: 'black',
    textActiveColor: 'greyDarker',
  }

  return (
    <section className={styles.wrapper}>
      <section
        className={containerClasses}
        style={{ display: displayContainer ? 'flex' : 'none' }}
        onTransitionEnd={() => {
          if (!show) {
            // If it's opacity=0, it's still clickable,
            // need hide container after transition
            setDisplayContainer(false)
          }
        }}
      >
        <section className={styles.toolbar}>
          <AppreciationButton
            article={articleDetails}
            privateFetched={privateFetched}
            textIconSpacing={6}
            disabled={lock}
            clickEvent={() => {
              analytics.trackEvent('click_button', {
                type: 'appreciate',
                pageType: 'article_detail',
                pageComponent: 'article_float_toolbar',
              })
            }}
            {...buttonProps}
          />

          <span className={styles.divider} />
          <CommentButton
            article={articleDetails}
            disabled={!articleDetails.canComment}
            textIconSpacing={6}
            onClick={toggleCommentDrawer}
            {...buttonProps}
          />
          <span className={styles.divider} />
          <DonationButton
            articleDetail={articleDetails}
            disabled={lock || isAuthor}
            textIconSpacing={6}
            onClick={() => {
              if (!viewer.isAuthed) {
                window.dispatchEvent(
                  new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                    detail: {
                      trigger: UNIVERSAL_AUTH_TRIGGER.support,
                    },
                  })
                )
                return
              }

              toggleDonationDrawer()
            }}
            {...buttonProps}
          />
        </section>
      </section>
    </section>
  )
}

export default FloatToolbar
