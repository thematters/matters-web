import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import {
  IconClear16,
  IconHashTag16,
  IconProps,
  TextIcon,
  TextIconProps,
} from '~/components'

import { TAG_CONTENT_CLAMP_LENGTH } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { DigestTag } from './__generated__/DigestTag'

interface TagProps {
  tag: DigestTag
  type?: 'list' | 'title' | 'inline' | 'plain'
  iconProps?: IconProps
  textIconProps?: TextIconProps
  active?: boolean
  disabled?: boolean // disable default <a>
  hasCount?: boolean
  hasClose?: boolean
  canClamp?: boolean
  removeTag?: (tag: DigestTag) => void
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
  } as DigestTag)

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

  const tagName =
    canClamp && tag.content.length > TAG_CONTENT_CLAMP_LENGTH
      ? `${tag.content.slice(0, TAG_CONTENT_CLAMP_LENGTH)}⋯`
      : tag.content

  const path = toPath({
    page: 'tagDetail',
    id: tag.id,
    content: tag.content,
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
        size: 'sm',
        weight: 'md',
        spacing: 0,
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
      <TextIcon
        icon={<IconHashTag16 {...iconProps} />}
        {...textIconProps}
        size={textIconProps.size}
        allowUserSelect
      >
        <span className="name">{tagName}</span>
      </TextIcon>

      {hasClose && (
        <button
          className="close"
          onClick={() => {
            removeTag?.(tag)
          }}
        >
          <IconClear16 color="grey" />
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
    <Link {...path}>
      <a className={tagClasses} onClick={onClick}>
        <Inner />
        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Tag.fragments = fragments
