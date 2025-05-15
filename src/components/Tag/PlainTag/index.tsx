import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export const PlainTag = ({
  tag,
  textIconProps: customTextIconProps,
}: {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
}) => {
  const tagName = tag.content
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles.plain]: 'plain',
  })

  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const textIconProps: TextIconProps = {
    size: 12,
    weight: 'normal',
    spacing: 0,
    color: 'green',
    icon: <Icon icon={IconHashTag} color="black" />,
    placement: 'right',
    ...customTextIconProps,
  }

  return (
    <Link {...path}>
      <a className={tagClasses} data-test-id={TEST_ID.DIGEST_TAG_PLAIN}>
        <TextIcon {...textIconProps} size={textIconProps.size} allowUserSelect>
          <span className={styles.name}>{tagName}</span>
        </TextIcon>
      </a>
    </Link>
  )
}

PlainTag.fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      numArticles
    }
  `,
}
