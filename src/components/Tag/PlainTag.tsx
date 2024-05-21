import classNames from 'classnames'
import Link from 'next/link'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { toPath } from '~/common/utils'
import { Icon, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import { tagFragments } from './index'
import styles from './styles.module.css'

export const PlainTag = ({
  tag,
  textIconProps: customTextIconProps,
}: {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
}) => {
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles['inline']]: 'inline',
    [styles.active]: false,
    [styles.clickable]: false,
    [styles.disabled]: true,
  })

  const tagName = tag.content

  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const textIconProps: TextIconProps = {
    size: 12,
    weight: 'normal',
    spacing: 0,
    color: 'green',
    icon: <Icon icon={IconHashTag} color="grey" />,
    placement: 'right',
    ...customTextIconProps,
  }

  return (
    <Link {...path} legacyBehavior>
      <a className={tagClasses}>
        <TextIcon {...textIconProps} size={textIconProps.size} allowUserSelect>
          <span className={styles.name}>{tagName}</span>
        </TextIcon>
      </a>
    </Link>
  )
}

PlainTag.fragments = tagFragments
