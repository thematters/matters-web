import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Icon, IconProps, TextIcon, TextIconProps } from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

import { DigestTag } from './__generated__/DigestTag'

interface TagProps {
  tag: DigestTag
  type?: 'list' | 'title' | 'inline'
  active?: boolean
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
  `
}

export const Tag = ({ tag, type = 'list', active }: TagProps) => {
  const tagClasses = classNames({
    tag: true,
    [type]: type,
    active
  })

  const path = toPath({
    page: 'tagDetail',
    id: tag.id
  })

  const isListTag = type === 'list'
  const isTitleTag = type === 'title'
  const isInlineTag = type === 'inline'

  let iconProps: IconProps = {}
  let textIconProps: TextIconProps = {}

  if (isListTag) {
    iconProps = {
      color: 'grey'
    }
    textIconProps = {
      size: 'md',
      weight: 'normal',
      spacing: 'xxtight',
      color: 'black'
    }
  } else if (isTitleTag) {
    iconProps = {
      color: 'white',
      size: 'md'
    }
    textIconProps = {
      size: 'lg',
      weight: 'md',
      spacing: 0,
      color: 'white'
    }
  } else if (isInlineTag) {
    iconProps = {
      color: active ? 'green' : 'grey'
    }
    textIconProps = {
      size: 'sm',
      weight: 'md',
      spacing: 0,
      color: active ? 'green' : 'grey-darker'
    }
  }

  const tagCount = numAbbr(tag.articles.totalCount || 0)
  const hasCount = isListTag

  return (
    <Link {...path}>
      <a className={tagClasses}>
        <TextIcon icon={<Icon.HashTag {...iconProps} />} {...textIconProps}>
          {tag.content}
        </TextIcon>

        {hasCount && tagCount && <span className="count">{tagCount}</span>}

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Tag.fragments = fragments
