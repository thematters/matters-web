import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  REFETCH_RESPONSES,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { numAbbr, translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  CommentFormDialog,
  IconComment16,
  LanguageContext,
  Media,
  TextIcon,
  toast,
  Translate,
  ViewerContext,
} from '~/components'
import {
  CommentBarArticlePrivateFragment,
  CommentBarArticlePublicFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

type CommentBarArticle = CommentBarArticlePublicFragment &
  Partial<CommentBarArticlePrivateFragment>

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
        canComment
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
  article,
  ...props
}: (CardProps | ButtonProps) & {
  article: CommentBarArticle
}) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Media at="sm">
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="greyLighter"
          aria-label={`${translate({ id: 'putComment', lang })}…`}
          aria-haspopup="dialog"
          {...(props as ButtonProps)}
        >
          <TextIcon
            icon={<IconComment16 size="mdS" />}
            weight="md"
            spacing="xtight"
            size="sm"
          >
            {article.responseCount > 0
              ? numAbbr(article.responseCount)
              : undefined}
          </TextIcon>
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Card
          bgColor="greyLighter"
          spacing={[0, 0]}
          borderRadius="base"
          role="button"
          ariaHasPopup="dialog"
          {...(props as CardProps)}
        >
          <p className={styles.content}>
            <Translate id="putComment" />
            <Translate zh_hant="…" zh_hans="…" en="…" />
          </p>
        </Card>
      </Media>
    </>
  )
}

const CommentBar = ({ article, disabled }: CommentBarProps) => {
  const viewer = useContext(ViewerContext)

  const refetchResponses = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  if (disabled) {
    return <Content article={article} disabled />
  }

  if (viewer.isInactive) {
    return (
      <Content
        article={article}
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

    return <Content aria-haspopup="dialog" article={article} {...props} />
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
          aria-haspopup="dialog"
          onClick={openDialog}
        />
      )}
    </CommentFormDialog>
  )
}

CommentBar.fragments = fragments

export default CommentBar
