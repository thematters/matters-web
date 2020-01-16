import classNames from 'classnames'
import gql from 'graphql-tag'

import { Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import LinkWrapper from './LinkWrapper'
import styles from './styles.css'

import { TitleArticle } from './__generated__/TitleArticle'

interface TitleProps {
  article: TitleArticle

  textSize?: 'md-s' | 'md' | 'xm'
  textWeight?: 'normal' | 'md'
  is?: 'h2' | 'h3' | 'h4'
}

const fragments = {
  article: gql`
    fragment TitleArticle on Article {
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

const Title = ({
  article,
  textSize = 'md',
  textWeight = 'md',
  is = 'h2'
}: TitleProps) => {
  const { author, mediaHash, slug, articleState: state } = article

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName || '',
    slug: slug || '',
    mediaHash: mediaHash || ''
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
    <LinkWrapper {...path} isBanned={isBanned}>
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

Title.fragments = fragments

export default Title
