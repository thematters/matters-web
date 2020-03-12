import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Icon, IconSize, TextIcon, TextIconProps } from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

import { DigestTag } from './__generated__/DigestTag'

type TagProps = {
  type?: 'count-fixed'
  hasCount?: boolean
  tag: DigestTag
  iconSize?: IconSize
} & Pick<TextIconProps, 'size' | 'spacing'>

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
  type,
  tag,
  hasCount = true,
  iconSize = 'md-s',
  size = 'md',
  spacing = 'xtight'
}: TagProps) => {
  const tagClasses = classNames({
    tag: true,
    'count-fixed': type === 'count-fixed'
  })
  const path = toPath({
    page: 'tagDetail',
    id: tag.id
  })
  const tagCount = numAbbr(tag.articles.totalCount || 0)

  return (
    <Link {...path}>
      <a className={tagClasses}>
        <TextIcon
          icon={<Icon.HashTag color="grey" size={iconSize} />}
          weight="md"
          size={size}
          spacing={spacing}
        >
          {tag.content}
        </TextIcon>

        {hasCount && tagCount && <span className="count">{tagCount}</span>}

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Tag.fragments = fragments
