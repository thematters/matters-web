import classNames from 'classnames'
import gql from 'graphql-tag'

import { LinkWrapper, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { TitleDigestArticle } from './__generated__/TitleDigestArticle'

export type TitleDigestTextSize = 'sm' | 'md-s' | 'md' | 'xm'
export type TitleDigestTextWeight = 'normal' | 'md'
export type TitleDigestIs = 'h2' | 'h3' | 'h4'

interface TitleDigestProps {
  article: TitleDigestArticle

  textSize?: TitleDigestTextSize
  textWeight?: TitleDigestTextWeight
  is?: TitleDigestIs
  disabled?: boolean
}

const fragments = {
  article: gql`
    fragment TitleDigestArticle on Article {
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

const TitleDigest = ({
  article,

  textSize = 'md',
  textWeight = 'md',
  is = 'h2',
  disabled
}: TitleDigestProps) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article
  })
  const isBanned = state === 'banned'
  const title = isBanned ? (
    <Translate
      zh_hant={TEXT.zh_hant.articleBanned}
      zh_hans={TEXT.zh_hans.articleBanned}
    />
  ) : (
    article.title
  )
  const titleClasses = classNames({
    title: true,
    [`text-size-${textSize}`]: !!textSize,
    [`text-weight-${textWeight}`]: !!textWeight
  })

  return (
    <LinkWrapper {...path} disabled={disabled || isBanned}>
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

TitleDigest.fragments = fragments

export default TitleDigest
