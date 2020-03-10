import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Icon, TextIcon } from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

import { DigestTag } from './__generated__/DigestTag'

type TagSize = 'sm' | 'lg'

interface TagProps {
  size?: TagSize
  type?: 'count-fixed'
  onClick?: () => void
  style?: React.CSSProperties
  count?: boolean
  spacing?: 0 | '0' | 'xxxtight' | 'xxtight' | 'xtight' | 'tight' | 'base'
  tag: DigestTag
}

/**
 *
 * Usage:
 *
 * ```tsx
 * <Tag size="sm" tag={tag} />
 * ```
 */

const fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `
}

export const Tag = ({
  size,
  type,
  tag,
  onClick,
  style,
  count = true,
  spacing
}: TagProps) => {
  const tagClasses = classNames({
    tag: true,
    [`size-${size}`]: !!size,
    'count-fixed': type === 'count-fixed'
  })
  const isSmall = size === 'sm'
  const path = toPath({
    page: 'tagDetail',
    id: tag.id
  })
  const tagCount = count && numAbbr(tag.articles.totalCount || 0)

  return (
    <Link {...path}>
      <a className={tagClasses} onClick={onClick} style={style}>
        <TextIcon
          icon={
            <Icon.HashTag color="grey" size={isSmall ? undefined : 'md-s'} />
          }
          weight="md"
          size={isSmall ? 'sm' : 'md'}
          spacing={!spacing ? (isSmall ? 'xtight' : 'tight') : spacing}
        >
          {tag.content}
        </TextIcon>

        {!!tagCount && <span className="count">{tagCount}</span>}

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Tag.fragments = fragments
