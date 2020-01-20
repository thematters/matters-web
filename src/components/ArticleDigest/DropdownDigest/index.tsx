import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

import { Icon, Title, Translate } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { DropdownDigestArticle } from './__generated__/DropdownDigestArticle'

interface DropdownDigestProps {
  article: DropdownDigestArticle
  hasArrow?: boolean
  disabled?: boolean
}

const fragments = {
  article: gql`
    fragment DropdownDigestArticle on Article {
      id
      title
      state
      slug
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      mediaHash
    }
    ${UserDigest.Mini.fragments.user}
  `
}

const DropdownDigest = ({
  article,
  hasArrow,
  disabled,
  onClick
}: DropdownDigestProps & { onClick?: MouseEventHandler }) => {
  const { author, state } = article

  const path = toPath({
    page: 'articleDetail',
    article
  })
  const conatinerClass = classNames({
    container: true,
    'has-arrow': hasArrow
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
  const contentClass = classNames({
    content: true,
    inactive: state !== 'active',
    disabled
  })

  const LinkWrapper: React.FC = ({ children }) =>
    isBanned ? (
      <span>{children}</span>
    ) : (
      <Link {...path}>
        <a>{children}</a>
      </Link>
    )

  return (
    <section className={conatinerClass}>
      <div className={contentClass} onClick={onClick}>
        <LinkWrapper>
          <Title type="sidebar" is="h2">
            {title}
          </Title>
        </LinkWrapper>

        <UserDigest.Mini
          user={author}
          avatarSize="xs"
          textSize="sm-s"
          hasAvatar
          hasDisplayName
          hasUserName
        />

        {!isBanned && hasArrow && (
          <Link {...path}>
            <a className="arrow" target="_blank">
              <Icon.ArrowUpRight />
            </a>
          </Link>
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

DropdownDigest.fragments = fragments

export default DropdownDigest
