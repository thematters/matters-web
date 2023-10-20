import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  CLOSE_ACTIVE_DIALOG,
  ERROR_CODES,
  OPEN_LIKE_COIN_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
  REFETCH_RESPONSES,
} from '~/common/enums'
import { appendTarget, numAbbr, translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  CommentFormDialog,
  ERROR_MESSAGES,
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

  if (viewer.shouldSetupLikerID) {
    return (
      <Content
        article={article}
        aria-haspopup="dialog"
        onClick={() =>
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
        }
      />
    )
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
    const smUpProps = {
      onClick: () => {
        window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
        window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
      },
    }
    const smProps = appendTarget(PATHS.LOGIN, true)

    return (
      <>
        <Media at="sm">
          <Content article={article} {...smProps} />
        </Media>
        <Media greaterThan="sm">
          <Content aria-haspopup="dialog" article={article} {...smUpProps} />
        </Media>
      </>
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
          aria-haspopup="dialog"
          onClick={openDialog}
        />
      )}
    </CommentFormDialog>
  )
}

CommentBar.fragments = fragments

export default CommentBar
