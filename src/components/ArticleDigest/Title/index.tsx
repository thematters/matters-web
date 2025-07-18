import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage, useIntl } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { toast } from '~/components'
import { ArticleDigestTitleArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type ArticleDigestTitleTextSize = 12 | 13 | 14 | 15 | 16 | 18 | 24
export type ArticleDigestTitleTextWeight = 'normal' | 'medium' | 'semibold'
export type ArticleDigestTitleIs = 'h2' | 'h3'

type ArticleDigestTitleProps = {
  article: ArticleDigestTitleArticleFragment
  collectionId?: string
  textSize?: ArticleDigestTitleTextSize
  textWeight?: ArticleDigestTitleTextWeight
  lineClamp?: boolean | 1 | 2 | 3
  is?: ArticleDigestTitleIs
  disabledArchived?: boolean

  disabled?: boolean
  onClick?: () => void
}

const fragments = {
  article: gql`
    fragment ArticleDigestTitleArticle on Article {
      id
      title
      articleState: state
      slug
      shortHash
      author {
        id
        userName
      }
    }
  `,
}

export const ArticleDigestTitle = ({
  article,
  collectionId,
  textSize = 16,
  textWeight = 'medium',
  lineClamp = true,
  is = 'h2',

  disabled,
  disabledArchived,
  onClick,

  ...restProps
}: ArticleDigestTitleProps) => {
  const intl = useIntl()
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    collectionId,
  })
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const title = isBanned
    ? intl.formatMessage({
        defaultMessage:
          'The article has been archived due to violation of terms',
        id: '+GAaxB',
      })
    : article.title
  const titleClasses = classNames({
    [styles.title]: true,
    [styles[`text${textSize}`]]: !!textSize,
    [styles[`font${capitalizeFirstLetter(textWeight)}`]]: !!textWeight,
    [styles.lineClamp]: !!lineClamp,
    [styles[`lineClampLine${lineClamp}`]]: lineClamp === 1 || lineClamp === 3,
    [styles.archived]: isArchived && disabledArchived,
  })
  const isClickable = !disabled && !isBanned

  const Title = () => (
    <>
      {is === 'h2' ? (
        <h2 className={titleClasses} title={title}>
          {title}
        </h2>
      ) : is === 'h3' ? (
        <h3 className={titleClasses} title={title}>
          {title}
        </h3>
      ) : is === 'h4' ? (
        <h4 className={titleClasses} title={title}>
          {title}
        </h4>
      ) : (
        <h5 className={titleClasses} title={title}>
          {title}
        </h5>
      )}
    </>
  )

  if (isArchived && disabledArchived) {
    return (
      <section
        role="button"
        onClick={() => {
          toast.success({
            message: (
              <FormattedMessage defaultMessage="Archived Work" id="Jmg5do" />
            ),
          })
        }}
      >
        <Title />
      </section>
    )
  }

  if (!isClickable) {
    return <Title />
  }

  return (
    <Link
      {...path}
      onClick={onClick}
      data-test-id={TEST_ID.DIGEST_ARTICLE_TITLE}
      {...restProps}
      className={isClickable ? 'u-link-active-green' : undefined}
    >
      <Title />
    </Link>
  )
}

ArticleDigestTitle.fragments = fragments
