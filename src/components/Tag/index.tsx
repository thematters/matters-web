import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { IconHashTag, IconProps, TextIcon, TextIconProps } from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

import { DigestTag } from './__generated__/DigestTag'

interface TagProps {
  tag: DigestTag
  type?: 'list' | 'title' | 'inline'
  textSize?: 'sm'
  active?: boolean
  disabled?: boolean
  hasCount?: boolean
}

const fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

export const toDigestTag = (content: string) =>
  ({
    __typename: 'Tag',
    id: content,
    content,
    articles: {
      __typename: 'ArticleConnection',
      totalCount: 0,
    },
  } as DigestTag)

export const Tag = ({
  tag,
  type = 'list',
  textSize,
  active,
  disabled,
  hasCount = true,
}: TagProps) => {
  const tagClasses = classNames({
    tag: true,
    [type]: type,
    active,
    disabled,
  })

  const path = toPath({
    page: 'tagDetail',
    id: tag.id,
  })

  let iconProps: IconProps = {}
  let textIconProps: TextIconProps = {}

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
        color: active ? 'green' : 'grey-darker',
      }
      break
  }

  const tagCount = numAbbr(tag.articles.totalCount || 0)

  const Inner = () => (
    <>
      <TextIcon
        icon={<IconHashTag {...iconProps} />}
        {...textIconProps}
        size={textSize || textIconProps.size}
      >
        {tag.content}
      </TextIcon>

      {hasCount && type === 'list' && <span className="count">{tagCount}</span>}

      <style jsx>{styles}</style>
    </>
  )

  if (disabled) {
    return (
      <span className={tagClasses}>
        <Inner />
        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <Link {...path}>
      <a className={tagClasses}>
        <Inner />
        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Tag.fragments = fragments
