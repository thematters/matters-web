import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components'
import { Icon } from '~/components/Icon'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'
import ICON_ARROW_UP_RIGHT from '~/static/icons/arrow-up-right.svg?sprite'

import { DropdownDigestArticle } from './__generated__/DropdownDigestArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment DropdownDigestArticle on Article {
      id
      title
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
  hasArrow
}: {
  article: DropdownDigestArticle
  hasArrow?: boolean
}) => {
  const { author, slug, mediaHash, title } = article

  if (!author || !author.userName || !slug || !mediaHash) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash
  })

  return (
    <section className="container">
      <Link {...path}>
        <a>
          <Title type="sidebar" is="h2">
            {title}
          </Title>
        </a>
      </Link>

      <UserDigest.Mini user={author} avatarSize="xxxsmall" textSize="xsmall" />

      {hasArrow && (
        <Link {...path}>
          <a className="arrow" target="_blank">
            <Icon
              id={ICON_ARROW_UP_RIGHT.id}
              viewBox={ICON_ARROW_UP_RIGHT.viewBox}
              size="small"
            />
          </a>
        </Link>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

DropdownDigest.fragments = fragments

export default DropdownDigest
