import classNames from 'classnames'
import Link from 'next/link'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { clampTag, toPath } from '~/common/utils'
import { Icon, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import { tagFragments } from './index'
import styles from './styles.module.css'

interface ArticleTagProps {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
  active?: boolean
  canClamp?: boolean
  onClick?: () => void
}

export const ArticleTag = ({
  tag,
  textIconProps: customTextIconProps,
  active,
  canClamp = false,
  onClick,
}: ArticleTagProps) => {
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles['article']]: 'article',
    [styles.active]: active,
    [styles.clickable]: !!onClick,
    [styles.disabled]: !onClick,
  })

  const tagName = canClamp ? clampTag(tag.content) : tag.content

  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const textIconProps: TextIconProps = {
    size: 14,
    weight: 'normal',
    icon: <Icon icon={IconHashTag} color="grey" />,
    placement: 'right',
    ...customTextIconProps,
  }

  return (
    <Link {...path} legacyBehavior>
      <a className={tagClasses} onClick={onClick}>
        <TextIcon {...textIconProps} size={textIconProps.size} allowUserSelect>
          <span className={styles.name}>#&nbsp;{tagName}</span>
        </TextIcon>
      </a>
    </Link>
  )
}

ArticleTag.fragments = tagFragments
