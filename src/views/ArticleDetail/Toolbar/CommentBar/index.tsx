import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  CommentFormDialog,
  IconComment16,
  LanguageContext,
  TextIcon,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'

import {
  ADD_TOAST,
  CLOSE_ACTIVE_DIALOG,
  OPEN_LIKE_COIN_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
  REFETCH_RESPONSES,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { appendTarget, numAbbr, translate } from '~/common/utils'

import styles from './styles.css'

import { CommentBarArticlePrivate } from './__generated__/CommentBarArticlePrivate'
import { CommentBarArticlePublic } from './__generated__/CommentBarArticlePublic'

type CommentBarArticle = CommentBarArticlePublic &
  Partial<CommentBarArticlePrivate>

interface CommentBarProps {
  article: CommentBarArticle
  disabled?: boolean
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
}) => {
  const { lang } = useContext(LanguageContext)

  return isSmallUp ? (
    <Card
      bgColor="grey-lighter"
      spacing={[0, 0]}
      borderRadius="base"
      ariaRole="button"
      ariaHasPopup="dialog"
      {...(props as CardProps)}
    >
      <p>
        <Translate id="putComment" />
        <Translate zh_hant="…" zh_hans="…" en="…" />
        <style jsx>{styles}</style>
      </p>
    </Card>
  ) : (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor="grey-lighter"
      aria-label={translate({ id: 'putComment', lang })}
      aria-haspopup="dialog"
      {...(props as ButtonProps)}
    >
      <TextIcon
        icon={<IconComment16 size="md-s" />}
        weight="md"
        spacing="xtight"
        size="sm"
      >
        {article.responseCount > 0 ? numAbbr(article.responseCount) : undefined}
      </TextIcon>
    </Button>
  )
}

const CommentBar = ({ article, disabled }: CommentBarProps) => {
  const viewer = useContext(ViewerContext)
  const isSmallUp = useResponsive('sm-up')

  const refetchResponses = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  const props = {
    isSmallUp,
    article,
  }

  if (disabled) {
    return <Content {...props} disabled />
  }

  if (viewer.shouldSetupLikerID) {
    return (
      <Content
        {...props}
        aria-haspopup="dialog"
        onClick={() =>
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
        }
      />
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
            window.dispatchEvent(
              new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                detail: { source: UNIVERSAL_AUTH_SOURCE.comment },
              })
            )
          },
        }
      : appendTarget(PATHS.LOGIN, true)

    return <Content {...props} {...clickProps} />
  }

  return (
    <CommentFormDialog
      articleId={article.id}
      type="article"
      submitCallback={refetchResponses}
    >
      {({ openDialog }) => (
        <Content {...props} aria-haspopup="dialog" onClick={openDialog} />
      )}
    </CommentFormDialog>
  )
}

CommentBar.fragments = fragments

export default CommentBar
