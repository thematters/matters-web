import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  REFETCH_RESPONSES,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { numAbbr } from '~/common/utils'
import {
  Button,
  ButtonProps,
  CardProps,
  CommentFormDialog,
  IconComment24,
  TextIcon,
  toast,
  ViewerContext,
} from '~/components'
import {
  CommentButtonArticlePrivateFragment,
  CommentButtonArticlePublicFragment,
} from '~/gql/graphql'

type CommentButtonArticle = CommentButtonArticlePublicFragment &
  Partial<CommentButtonArticlePrivateFragment>

interface CommentButtonProps {
  article: CommentButtonArticle
  disabled?: boolean
  hasBorder?: boolean
  iconSize?: 'mdS' | 'md'
  textIconSpace?: 'xtight' | 'basexxtight'
}

const fragments = {
  article: {
    public: gql`
      fragment CommentButtonArticlePublic on Article {
        id
        responseCount
        canComment
      }
    `,
    private: gql`
      fragment CommentButtonArticlePrivate on Article {
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
  article,
  hasBorder,
  iconSize = 'mdS',
  textIconSpace = 'xtight',
  ...props
}: (CardProps | ButtonProps) & {
  article: CommentButtonArticle
  hasBorder?: boolean
  iconSize?: 'mdS' | 'md'
  textIconSpace?: 'xtight' | 'basexxtight'
}) => {
  const intl = useIntl()

  return (
    <>
      <Button
        spacing={['xtight', 'tight']}
        borderWidth={hasBorder ? 'sm' : undefined}
        borderColor={hasBorder ? 'greyLighterActive' : undefined}
        borderActiveColor={hasBorder ? 'greyLight' : undefined}
        borderRadius={hasBorder ? '0.75rem' : undefined}
        aria-label={`${intl.formatMessage({
          defaultMessage: 'Comment',
          id: 'Ix3e3Q',
          description: 'src/components/Forms/CommentForm/index.tsx',
        })}…`}
        aria-haspopup="dialog"
        {...(props as ButtonProps)}
      >
        <TextIcon
          icon={<IconComment24 size={iconSize} />}
          weight="md"
          spacing={textIconSpace}
          size="sm"
        >
          {article.responseCount > 0
            ? numAbbr(article.responseCount)
            : undefined}
        </TextIcon>
      </Button>
    </>
  )
}

const CommentButton = ({
  article,
  disabled,
  hasBorder,
  iconSize = 'mdS',
  textIconSpace = 'xtight',
}: CommentButtonProps) => {
  const viewer = useContext(ViewerContext)

  const refetchResponses = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  if (disabled) {
    return (
      <Content
        article={article}
        disabled
        iconSize={iconSize}
        textIconSpace={textIconSpace}
      />
    )
  }

  if (viewer.isInactive) {
    return (
      <Content
        article={article}
        hasBorder={hasBorder}
        iconSize={iconSize}
        textIconSpace={textIconSpace}
        onClick={() => {
          toast.error({
            message: (
              <FormattedMessage
                {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]}
              />
            ),
          })
        }}
      />
    )
  }

  if (article.author?.isBlocking) {
    return (
      <Content
        article={article}
        hasBorder={hasBorder}
        iconSize={iconSize}
        textIconSpace={textIconSpace}
        onClick={() => {
          toast.error({
            message: (
              <FormattedMessage
                defaultMessage="The author has disabled comments for this article"
                id="7cwoRo"
              />
            ),
          })
        }}
      />
    )
  }

  if (!viewer.isAuthed) {
    const props = {
      onClick: () => {
        // deprecated
        // window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
        window.dispatchEvent(
          new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
            detail: { trigger: UNIVERSAL_AUTH_TRIGGER.comment },
          })
        )
      },
    }

    return (
      <Content
        aria-haspopup="dialog"
        article={article}
        hasBorder={hasBorder}
        iconSize={iconSize}
        textIconSpace={textIconSpace}
        {...props}
      />
    )
  }

  return (
    <CommentFormDialog
      articleId={article.id}
      type="article"
      submitCallback={refetchResponses}
    >
      {({ openDialog }) => (
        <Content
          article={article}
          hasBorder={hasBorder}
          aria-haspopup="dialog"
          onClick={openDialog}
          iconSize={iconSize}
          textIconSpace={textIconSpace}
        />
      )}
    </CommentFormDialog>
  )
}

CommentButton.fragments = fragments

export default CommentButton
