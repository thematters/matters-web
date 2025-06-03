import classNames from 'classnames'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { LinkWrapper, LinkWrapperProps, toast } from '~/components'
import { ArticleDigestTitleArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type ArticleDigestTitleTextSize = 12 | 13 | 14 | 15 | 16 | 18 | 24
export type ArticleDigestTitleTextWeight = 'normal' | 'medium' | 'semibold'
export type ArticleDigestTitleIs = 'h2' | 'h3' | 'h4' | 'h5' | 'span'
export type ArticleDigestTitleColor = 'greyDark' | 'greyDarker' | 'black'

type ArticleDigestTitleProps = {
  article: ArticleDigestTitleArticleFragment
  collectionId?: string
  textSize?: ArticleDigestTitleTextSize
  textWeight?: ArticleDigestTitleTextWeight
  textColor?: ArticleDigestTitleColor
  lineClamp?: boolean | 1 | 2 | 3
  is?: ArticleDigestTitleIs
  disabledArchived?: boolean

  disabled?: boolean
  onClick?: () => void
} & Pick<LinkWrapperProps, 'onClick'>

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
  textColor = 'greyDarker',
  disabled,
  disabledArchived,
  onClick,

  ...restProps
}: ArticleDigestTitleProps) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    collectionId,
  })
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const title = isBanned ? (
    <FormattedMessage
      defaultMessage="The article has been archived due to violation of terms"
      id="+GAaxB"
    />
  ) : (
    article.title
  )
  const titleClasses = classNames({
    [styles.title]: true,
    [styles[`text${textSize}`]]: !!textSize,
    [styles[`font${capitalizeFirstLetter(textWeight)}`]]: !!textWeight,
    [styles.lineClamp]: !!lineClamp,
    [styles[`lineClampLine${lineClamp}`]]: lineClamp === 1 || lineClamp === 3,
    [styles.archived]: isArchived && disabledArchived,
    [styles[`textColor${capitalizeFirstLetter(textColor)}`]]: !!textColor,
  })
  const isClickable = !disabled && !isBanned

  const Title = () => (
    <>
      {is === 'h2' ? (
        <h2 className={titleClasses}>{title}</h2>
      ) : is === 'h3' ? (
        <h3 className={titleClasses}>{title}</h3>
      ) : is === 'h4' ? (
        <h4 className={titleClasses}>{title}</h4>
      ) : is === 'h5' ? (
        <h5 className={titleClasses}>{title}</h5>
      ) : (
        <span className={titleClasses}>{title}</span>
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

  return (
    <LinkWrapper
      {...path}
      textActiveColor={isClickable ? 'green' : undefined}
      disabled={!isClickable}
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_TITLE}
      {...restProps}
    >
      <Title />
    </LinkWrapper>
  )
}

ArticleDigestTitle.fragments = fragments
