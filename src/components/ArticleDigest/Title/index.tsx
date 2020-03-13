import classNames from 'classnames'
import gql from 'graphql-tag'

import { LinkWrapper, LinkWrapperProps, Translate } from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { ArticleDigestTitleArticle } from './__generated__/ArticleDigestTitleArticle'

export type ArticleDigestTitleTextSize = 'sm' | 'md-s' | 'md' | 'xm' | 'xl'
export type ArticleDigestTitleTextWeight = 'normal' | 'md' | 'semibold'
export type ArticleDigestTitleIs = 'h2' | 'h3' | 'h4'

type ArticleDigestTitleProps = {
  article: ArticleDigestTitleArticle

  textSize?: ArticleDigestTitleTextSize
  textWeight?: ArticleDigestTitleTextWeight
  is?: ArticleDigestTitleIs
  disabled?: boolean
} & Pick<LinkWrapperProps, 'onClick'>

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
  `
}

export const ArticleDigestTitle = ({
  article,

  textSize = 'md',
  textWeight = 'md',
  is = 'h2',
  disabled,

  ...restProps
}: ArticleDigestTitleProps) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article
  })
  const isBanned = state === 'banned'
  const title = isBanned ? <Translate id="articleBanned" /> : article.title
  const titleClasses = classNames({
    title: true,
    [`text-size-${textSize}`]: !!textSize,
    [`text-weight-${textWeight}`]: !!textWeight
  })
  const isClickable = !disabled && !isBanned

  return (
    <LinkWrapper
      {...path}
      textActiveColor={isClickable ? 'green' : undefined}
      disabled={!isClickable}
      {...restProps}
    >
      <>
        {is === 'h2' ? (
          <h2 className={titleClasses}>{title}</h2>
        ) : is === 'h3' ? (
          <h3 className={titleClasses}>{title}</h3>
        ) : (
          <h4 className={titleClasses}>{title}</h4>
        )}

        <style jsx>{styles}</style>
      </>
    </LinkWrapper>
  )
}

ArticleDigestTitle.fragments = fragments
