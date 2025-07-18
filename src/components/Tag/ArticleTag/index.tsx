import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import IconHashTag from '@/public/static/icons/24px/hashtag.svg'
import { TEST_ID } from '~/common/enums'
import { clampTag, toPath } from '~/common/utils'
import { Icon, TextIcon, TextIconProps, Tooltip } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface ArticleTagProps {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
  canClamp?: boolean
  onClick?: () => void
}

export const ArticleTag = ({
  tag,
  textIconProps: customTextIconProps,
  canClamp = false,
  onClick,
}: ArticleTagProps) => {
  const tagName = canClamp ? clampTag(tag.content) : tag.content
  const isClamped = tagName !== tag.content
  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const tagClasses = classNames({
    [styles.article]: 'article',
    [styles.clickable]: !!onClick,
  })

  const textIconProps: TextIconProps = {
    size: 14,
    spacing: 0,
    weight: 'normal',
    icon: <Icon icon={IconHashTag} color="greyDarker" />,
    ...customTextIconProps,
  }

  return isClamped ? (
    <Tooltip content={tag.content} placement="top">
      <section>
        <Link
          {...path}
          className={tagClasses}
          onClick={onClick}
          data-test-id={TEST_ID.DIGEST_TAG_ARTICLE}
        >
          <TextIcon
            {...textIconProps}
            size={textIconProps.size}
            allowUserSelect
          >
            <span className={styles.name}>{tagName}</span>
          </TextIcon>
        </Link>
      </section>
    </Tooltip>
  ) : (
    <Link
      {...path}
      className={tagClasses}
      onClick={onClick}
      data-test-id={TEST_ID.DIGEST_TAG_ARTICLE}
    >
      <TextIcon {...textIconProps} size={textIconProps.size} allowUserSelect>
        <span className={styles.name}>{tagName}</span>
      </TextIcon>
    </Link>
  )
}

ArticleTag.fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      numArticles
    }
  `,
}
