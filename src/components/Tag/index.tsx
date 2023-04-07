import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { clampTag, toPath } from '~/common/utils'
import { IconClose16, IconProps, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.css'

interface TagProps {
  tag: DigestTagFragment
  type?: 'list' | 'title' | 'inline' | 'plain'
  iconProps?: IconProps
  textIconProps?: TextIconProps
  active?: boolean
  disabled?: boolean // disable default <a>
  hasCount?: boolean
  hasClose?: boolean
  canClamp?: boolean
  removeTag?: (tag: DigestTagFragment) => void
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
  } as DigestTagFragment)

export const Tag = ({
  tag,
  type = 'list',
  iconProps: customIconProps,
  textIconProps: customTextIconProps,
  active,
  disabled,
  hasCount = true,
  hasClose,
  canClamp = false,
  removeTag,
  onClick,
}: TagProps) => {
  const tagClasses = classNames({
    tag: true,
    [type]: type,
    active,
    clickable: !!onClick,
    disabled: !!disabled && !onClick,
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
    case 'inline':
      iconProps = {
        color: active ? 'green' : 'grey',
      }
      textIconProps = {
        size: 'sm-s',
        weight: 'normal',
        spacing: 'xxtight',
        color: active ? 'white' : 'grey-darker',
      }
      break
    case 'plain':
      textIconProps = {
        size: 'sm-s',
        weight: 'normal',
        spacing: 'xxxtight',
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
        <span className="name">#&nbsp;{tagName}</span>
      </TextIcon>

      {hasClose && (
        <button
          className="close"
          onClick={() => {
            removeTag?.(tag)
          }}
        >
          <IconClose16 color="grey" />
        </button>
      )}

      {hasCount && type === 'list' && tag?.numArticles ? (
        <span className="count">{tag.numArticles}</span>
      ) : null}

      <style jsx>{styles}</style>
    </>
  )

  if (disabled) {
    return (
      <span className={tagClasses} onClick={onClick}>
        <Inner />
        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <Link {...path} legacyBehavior>
      <a className={tagClasses} onClick={onClick}>
        <Inner />
        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Tag.fragments = fragments
