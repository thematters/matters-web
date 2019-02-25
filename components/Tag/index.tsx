import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'

import { Icon, TextIcon } from '~/components'

import { toPath } from '~/common/utils'
import ICON_HASHTAG from '~/static/icons/hashtag.svg?sprite'

import { Tag as TagType } from './__generated__/Tag'
import { TagArticleDetail } from './__generated__/TagArticleDetail'
import styles from './styles.css'

type TagSize = 'small' | 'default'

interface TagProps {
  size?: TagSize
  type?: 'count-fixed' | 'default'
  tag: TagType | TagArticleDetail
}

/**
 *
 * Usage:
 *
 * ```tsx
 * <Tag size="small" tag={tag} />
 * ```
 */

const fragments = {
  tag: gql`
    fragment Tag on Tag {
      id
      content
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `,
  articleDetail: gql`
    fragment TagArticleDetail on Tag {
      id
      content
    }
  `
}

export const Tag: React.FC<TagProps> & { fragments: typeof fragments } = ({
  size = 'default',
  type = 'default',
  tag
}) => {
  const tagClasses = classNames({
    tag: true,
    [size]: true,
    'count-fixed': type === 'count-fixed',
    'u-link-color': true
  })
  const isSmall = size !== 'default'
  const path = toPath({
    page: 'tagDetail',
    id: tag.id
  })
  const tagCount = _get(tag, 'articles.totalCount', 0)

  return (
    <>
      <Link {...path}>
        <a className={tagClasses}>
          <TextIcon
            icon={
              <Icon
                size={isSmall ? 'xsmall' : 'small'}
                id={ICON_HASHTAG.id}
                viewBox={ICON_HASHTAG.viewBox}
              />
            }
            text={tag.content}
            weight="medium"
            size={isSmall ? 'sm' : 'md'}
            spacing={isSmall ? 'xtight' : 'tight'}
          />

          {!!tagCount && <span className="count">{tagCount}</span>}
        </a>
      </Link>
      <style jsx>{styles}</style>
    </>
  )
}

Tag.fragments = fragments
