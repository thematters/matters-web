import classNames from 'classnames'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath, UtmParams } from '~/common/utils'
import { LinkWrapper, LinkWrapperProps } from '~/components'
import { ArticleDigestTitleArticleFragment } from '~/gql/graphql'

import styles from './styles.css'

export type ArticleDigestTitleTextSize =
  | 'sm-s'
  | 'sm'
  | 'md-s'
  | 'md'
  | 'xm'
  | 'xl'
export type ArticleDigestTitleTextWeight = 'normal' | 'md' | 'semibold'
export type ArticleDigestTitleIs = 'h2' | 'h3' | 'h4' | 'h5'

type ArticleDigestTitleProps = {
  article: ArticleDigestTitleArticleFragment

  textSize?: ArticleDigestTitleTextSize
  textWeight?: ArticleDigestTitleTextWeight
  lineClamp?: boolean
  is?: ArticleDigestTitleIs

  disabled?: boolean
  onClick?: () => void
} & Pick<LinkWrapperProps, 'onClick'> &
  UtmParams

const fragments = {
  article: gql`
    fragment ArticleDigestTitleArticle on Article {
      id
      title
      articleState: state
      slug
      mediaHash
      author {
        id
        userName
      }
    }
  `,
}

export const ArticleDigestTitle = ({
  article,

  textSize = 'md',
  textWeight = 'md',
  lineClamp = true,
  is = 'h2',

  disabled,
  onClick,

  utm_source,
  utm_medium,

  ...restProps
}: ArticleDigestTitleProps) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    utm_source,
    utm_medium,
  })
  const isBanned = state === 'banned'
  const title = isBanned ?
    <FormattedMessage defaultMessage="The article has been archived due to violation of terms" description="src/components/ArticleDigest/Title/index.tsx" /> : article.title
  const titleClasses = classNames({
    title: true,
    [`text-size-${textSize}`]: !!textSize,
    [`text-weight-${textWeight}`]: !!textWeight,
    'line-clamp': lineClamp,
  })
  const isClickable = !disabled && !isBanned

  return (
    <LinkWrapper
      {...path}
      textActiveColor={isClickable ? 'green' : undefined}
      disabled={!isClickable}
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_TITLE}
      {...restProps}
    >
      <>
        {is === 'h2' ? (
          <h2 className={titleClasses}>{title}</h2>
        ) : is === 'h3' ? (
          <h3 className={titleClasses}>{title}</h3>
        ) : is === 'h4' ? (
          <h4 className={titleClasses}>{title}</h4>
        ) : (
          <h5 className={titleClasses}>{title}</h5>
        )}

        <style jsx>{styles}</style>
      </>
    </LinkWrapper>
  )
}

ArticleDigestTitle.fragments = fragments
