import classNames from 'classnames'
import gql from 'graphql-tag'

import { Card, CardProps } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'

import { TitleDigest, TitleDigestTextSize } from '../TitleDigest'
import OpenExternalLink from './OpenExternalLink'
import styles from './styles.css'

import { DropdownDigestArticle } from './__generated__/DropdownDigestArticle'

type DropdownDigestProps = {
  article: DropdownDigestArticle

  titleTextSize?: TitleDigestTextSize
  disabled?: boolean
  extraButton?: React.ReactNode
} & Pick<
  CardProps,
  'spacing' | 'bgColor' | 'bgHoverColor' | 'borderRadius' | 'onClick'
>

const fragments = {
  article: gql`
    fragment DropdownDigestArticle on Article {
      id
      title
      articleState: state
      slug
      mediaHash
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      ...TitleDigestArticle
    }

    ${UserDigest.Mini.fragments.user}
    ${TitleDigest.fragments.article}
  `
}

export const DropdownDigest = ({
  article,

  titleTextSize,
  disabled,
  extraButton,

  // Card Props
  spacing,
  bgColor,
  bgHoverColor,
  borderRadius,
  onClick
}: DropdownDigestProps) => {
  const { articleState: state } = article
  const isBanned = state === 'banned'
  const containerClass = classNames({
    container: true,
    'has-extra-button': !!extraButton
  })
  const path = toPath({
    page: 'articleDetail',
    article
  })
  const cardDisabled = isBanned || disabled

  return (
    <Card
      href={cardDisabled ? undefined : path.href}
      as={cardDisabled ? undefined : path.as}
      spacing={spacing}
      borderRadius={borderRadius}
      bgColor={bgColor}
      bgHoverColor={bgHoverColor}
      onClick={onClick}
    >
      <section className={containerClass}>
        <header>
          <TitleDigest
            article={article}
            textSize={titleTextSize}
            disabled={cardDisabled}
            is="h3"
          />

          <section className="extra-button">{!isBanned && extraButton}</section>
        </header>

        <footer>
          <UserDigest.Mini
            user={article.author}
            avatarSize="xs"
            textSize="sm-s"
            hasAvatar
            hasUserName
            hasDisplayName
            disabled={cardDisabled}
          />
        </footer>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

DropdownDigest.fragments = fragments
DropdownDigest.OpenExternalLink = OpenExternalLink
