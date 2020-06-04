import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Card,
  CardProps,
  CommentFormDialog,
  LikeCoinDialog,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'

import {
  ADD_TOAST,
  CLOSE_ACTIVE_DIALOG,
  OPEN_LOGIN_DIALOG,
  PATHS,
  REFETCH_RESPONSES,
} from '~/common/enums'
import { appendTarget } from '~/common/utils'

import styles from './styles.css'

import { CommentBarArticlePrivate } from './__generated__/CommentBarArticlePrivate'
import { CommentBarArticlePublic } from './__generated__/CommentBarArticlePublic'

interface CommentBarProps {
  article: CommentBarArticlePublic & Partial<CommentBarArticlePrivate>
}

const fragments = {
  article: {
    public: gql`
      fragment CommentBarArticlePublic on Article {
        id
        live
      }
    `,
    private: gql`
      fragment CommentBarArticlePrivate on Article {
        id
        author {
          id
          isBlocking
        }
      }
    `,
  },
}

const CommentBar = ({ article }: CommentBarProps) => {
  const viewer = useContext(ViewerContext)
  const isSmallUp = useResponsive('sm-up')

  const refetchResponses = () => {
    if (article.live) {
      return
    }
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  const cardProps: CardProps = {
    bgColor: 'grey-lighter',
    spacing: [0, 0],
    borderRadius: 'base',
  }

  const Content = () => (
    <p>
      <Translate id="putComment" />
      <Translate zh_hant="…" zh_hans="…" />
      <style jsx>{styles}</style>
    </p>
  )

  if (viewer.shouldSetupLikerID) {
    return (
      <LikeCoinDialog>
        {({ open }) => (
          <Card aria-haspopup="true" onClick={open} {...cardProps}>
            <Content />
          </Card>
        )}
      </LikeCoinDialog>
    )
  }

  if (viewer.isOnboarding && article.author?.id !== viewer.id) {
    return (
      <Card
        {...cardProps}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: <Translate id="failureCommentOnboarding" />,
              },
            })
          )
        }}
      >
        <Content />
      </Card>
    )
  }

  if (viewer.isInactive) {
    return (
      <Card
        {...cardProps}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: <Translate id="FORBIDDEN" />,
              },
            })
          )
        }}
      >
        <Content />
      </Card>
    )
  }

  if (article.author?.isBlocking) {
    return (
      <Card
        {...cardProps}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: <Translate id="failureCommentBlocked" />,
              },
            })
          )
        }}
      >
        <Content />
      </Card>
    )
  }

  if (!viewer.isAuthed) {
    const clickProps = isSmallUp
      ? {
          onClick: () => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
          },
        }
      : appendTarget(PATHS.LOGIN, true)

    return (
      <Card {...clickProps} {...cardProps}>
        <Content />
      </Card>
    )
  }

  return (
    <CommentFormDialog articleId={article.id} submitCallback={refetchResponses}>
      {({ open }) => (
        <Card aria-haspopup="true" onClick={open} {...cardProps}>
          <Content />
        </Card>
      )}
    </CommentFormDialog>
  )
}

CommentBar.fragments = fragments

export default CommentBar
