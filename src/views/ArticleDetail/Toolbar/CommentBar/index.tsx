import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  CommentFormDialog,
  IconComment,
  LikeCoinDialog,
  TextIcon,
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
  TEXT,
} from '~/common/enums'
import { appendTarget, numAbbr } from '~/common/utils'

import styles from './styles.css'

import { CommentBarArticlePrivate } from './__generated__/CommentBarArticlePrivate'
import { CommentBarArticlePublic } from './__generated__/CommentBarArticlePublic'

type CommentBarArticle = CommentBarArticlePublic &
  Partial<CommentBarArticlePrivate>

interface CommentBarProps {
  article: CommentBarArticle
}

const fragments = {
  article: {
    public: gql`
      fragment CommentBarArticlePublic on Article {
        id
        responseCount
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

const Content = ({
  isSmallUp,
  article,
  ...props
}: (CardProps | ButtonProps) & {
  isSmallUp: boolean
  article: CommentBarArticle
}) =>
  isSmallUp ? (
    <Card
      bgColor="grey-lighter"
      spacing={[0, 0]}
      borderRadius="base"
      {...(props as CardProps)}
    >
      <p>
        <Translate id="putComment" />
        <Translate zh_hant="…" zh_hans="…" />
        <style jsx>{styles}</style>
      </p>
    </Card>
  ) : (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor="grey-lighter"
      aira-label={TEXT.zh_hant.replyComment}
      {...(props as ButtonProps)}
    >
      <TextIcon
        icon={<IconComment size="md-s" />}
        weight="md"
        spacing="xtight"
        size="sm"
      >
        {numAbbr(article.responseCount || 0)}
      </TextIcon>
    </Button>
  )

const CommentBar = ({ article }: CommentBarProps) => {
  const viewer = useContext(ViewerContext)
  const isSmallUp = useResponsive('sm-up')

  const refetchResponses = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  const props = {
    isSmallUp,
    article,
  }

  if (viewer.shouldSetupLikerID) {
    return (
      <LikeCoinDialog>
        {({ open }) => (
          <Content {...props} aria-haspopup="true" onClick={open} />
        )}
      </LikeCoinDialog>
    )
  }

  if (viewer.isOnboarding && article.author?.id !== viewer.id) {
    return (
      <Content
        {...props}
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
      />
    )
  }

  if (viewer.isInactive) {
    return (
      <Content
        {...props}
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
      />
    )
  }

  if (article.author?.isBlocking) {
    return (
      <Content
        {...props}
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
      />
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

    return <Content {...props} {...clickProps} />
  }

  return (
    <CommentFormDialog articleId={article.id} submitCallback={refetchResponses}>
      {({ open }) => <Content {...props} aria-haspopup="true" onClick={open} />}
    </CommentFormDialog>
  )
}

CommentBar.fragments = fragments

export default CommentBar
