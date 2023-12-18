import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { clampTag, toPath } from '~/common/utils'
import { IconClose16, IconProps, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface TagProps {
  tag: DigestTagFragment
  type?: 'list' | 'article' | 'title' | 'inline' | 'plain'
  iconProps?: IconProps
  textIconProps?: TextIconProps
  active?: boolean

  is?: 'a' | 'span'
  hasCount?: boolean
  canClamp?: boolean

  onRemoveTag?: (tag: DigestTagFragment) => void
  onClick?: () => void
}

const fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      numArticles
      numAuthors
    }
  `,
}

export const toDigestTagPlaceholder = (content: string) =>
  ({
    __typename: 'Tag',
    id: content,
    content,
    articles: {
      __typename: 'ArticleConnection',
      totalCount: 0,
    },
    numArticles: 0,
    numAuthors: 0,
  }) as DigestTagFragment

export const Tag = ({
  tag,
  type = 'list',
  iconProps: customIconProps,
  textIconProps: customTextIconProps,
  active,
  is,
  hasCount = true,
  canClamp = false,
  onRemoveTag,
  onClick,
}: TagProps) => {
  const intl = useIntl()

  const tagClasses = classNames({
    [styles.tag]: true,
    [styles[type]]: type,
    [styles.active]: active,
    [styles.clickable]: !!onClick,
    [styles.disabled]: !!(is === 'span') && !onClick,
  })

  const tagName = canClamp ? clampTag(tag.content) : tag.content

  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  let iconProps: IconProps = {}
  let textIconProps: TextIconProps = {}

  // default styles based on type
  switch (type) {
    case 'list':
      iconProps = {
        color: 'grey',
      }
      textIconProps = {
        size: 'md',
        weight: 'normal',
        spacing: 'xxtight',
        color: 'black',
      }
      break
    case 'title':
      iconProps = {
        color: 'white',
        size: 'md',
      }
      textIconProps = {
        size: 'lg',
        weight: 'md',
        spacing: 0,
        color: 'white',
      }
      break
    case 'article':
      textIconProps = {
        size: 'sm',
        weight: 'normal',
      }
      break
    case 'inline':
      iconProps = {
        color: active ? 'green' : 'grey',
      }
      textIconProps = {
        size: 'smS',
        weight: 'normal',
        spacing: 'xxtight',
        color: active ? 'white' : 'greyDarker',
      }
      break
    case 'plain':
      textIconProps = {
        size: 'xs',
        weight: 'normal',
        spacing: 0,
        color: 'green',
      }
      break
  }

  // overwrite default styles with custom props
  iconProps = {
    ...iconProps,
    ...customIconProps,
  }
  textIconProps = {
    ...textIconProps,
    ...customTextIconProps,
  }

  const Inner = () => (
    <>
      <TextIcon {...textIconProps} size={textIconProps.size} allowUserSelect>
        <span className={styles.name}>#&nbsp;{tagName}</span>
      </TextIcon>

      {onRemoveTag && (
        <button
          className={styles.close}
          onClick={() => {
            onRemoveTag(tag)
          }}
          aria-label={intl.formatMessage({
            defaultMessage: 'Remove',
            id: 'Ayepqz',
            description: 'src/components/Tag/index.tsx',
          })}
        >
          <IconClose16 color="grey" />
        </button>
      )}

      {hasCount && type === 'list' && tag?.numArticles ? (
        <span className={styles.count}>{tag.numArticles}</span>
      ) : null}
    </>
  )

  if (is === 'span') {
    return (
      <span className={tagClasses} onClick={onClick}>
        <Inner />
      </span>
    )
  }

  return (
    <Link {...path} legacyBehavior>
      <a className={tagClasses} onClick={onClick}>
        <Inner />
      </a>
    </Link>
  )
}

Tag.fragments = fragments
