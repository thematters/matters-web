import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { TEST_ID } from '~/common/enums'
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
  onClick?: () => void
}

export const ListTag = ({
  tag,
  textIconProps: customTextIconProps,
  active,
  is,
  hasCount = true,
  onClick,
}: ListTagProps) => {
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

      {hasCount && tag?.numArticles ? (
        <span className={styles.count}>{tag.numArticles}</span>
      ) : null}
    </>
  )
  return is !== 'span' ? (
    <Link {...path} legacyBehavior>
      <a
        className={tagClasses}
        onClick={onClick}
        data-test-id={TEST_ID.DIGEST_TAG_LIST}
      >
        <Inner />
      </a>
    </Link>
  ) : (
    <span
      className={tagClasses}
      onClick={onClick}
      data-test-id={TEST_ID.DIGEST_TAG_LIST}
    >
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
    }
  `,
}
