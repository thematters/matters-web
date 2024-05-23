import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { toPath } from '~/common/utils'
import { Icon, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface ListTagProps {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
  active?: boolean
  is?: 'a' | 'span'
  hasCount?: boolean
  onRemoveTag?: (tag: DigestTagFragment) => void
  onClick?: () => void
}

export const ListTag = ({
  tag,
  textIconProps: customTextIconProps,
  active,
  is,
  hasCount = true,
  onClick,
  onRemoveTag,
}: ListTagProps) => {
  const intl = useIntl()
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles.list]: 'list',
    [styles.active]: active,
    [styles.clickable]: !!onClick,
    [styles.disabled]: !!(is === 'span') && !onClick,
  })

  const tagName = tag.content

  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const textIconProps: TextIconProps = {
    size: 16,
    weight: 'normal',
    spacing: 4,
    color: 'black',
    icon: <Icon icon={IconHashTag} color="black" />,
    placement: 'right',
    ...customTextIconProps,
  }

  const Inner = () => (
    <>
      <TextIcon {...textIconProps} size={textIconProps.size} allowUserSelect>
        <span className={styles.name}>{tagName}</span>
      </TextIcon>

      {onRemoveTag && (
        <button
          className={styles.close}
          onClick={() => {
            onRemoveTag(tag)
          }}
          aria-label={intl.formatMessage({
            defaultMessage: 'Remove',
            id: 'G/yZLu',
          })}
        >
          <Icon icon={IconTimes} color="grey" />
        </button>
      )}

      {hasCount && tag?.numArticles ? (
        <span className={styles.count}>{tag.numArticles}</span>
      ) : null}
    </>
  )
  return is !== 'span' ? (
    <Link {...path} legacyBehavior>
      <a className={tagClasses} onClick={onClick}>
        <Inner />
      </a>
    </Link>
  ) : (
    <span className={tagClasses} onClick={onClick}>
      <Inner />
    </span>
  )
}

ListTag.fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      numArticles
      numAuthors
    }
  `,
}
