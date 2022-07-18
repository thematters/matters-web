import classNames from 'classnames'
import gql from 'graphql-tag'

import { LinkWrapper, LinkWrapperProps, Translate } from '~/components'

import { toPath, UtmParams } from '~/common/utils'

import styles from './styles.css'

import { ArticleDigestTitleArticle } from './__generated__/ArticleDigestTitleArticle'

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
  article: ArticleDigestTitleArticle

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
  lineClamp,
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
  const title = isBanned ? <Translate id="articleBanned" /> : article.title
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
