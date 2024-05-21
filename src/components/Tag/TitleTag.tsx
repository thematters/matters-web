import classNames from 'classnames'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { toPath } from '~/common/utils'
import { Icon, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import { tagFragments } from './index'
import styles from './styles.module.css'

interface TitleTagProps {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
  active?: boolean
  is?: 'a' | 'span'
  hasCount?: boolean
  onRemoveTag?: (tag: DigestTagFragment) => void
}

export const TitleTag = ({
  tag,
  textIconProps: customTextIconProps,
  active,
  is,
  hasCount = true,
  onRemoveTag,
}: TitleTagProps) => {
  const intl = useIntl()
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles['title']]: 'title',
    [styles.active]: active,
    [styles.clickable]: false,
    [styles.disabled]: false,
  })

  const tagName = tag.content

  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  let textIconProps: TextIconProps = {
    size: 20,
    weight: 'medium',
    spacing: 0,
    color: 'white',
    icon: <Icon icon={IconHashTag} color="grey" />,
    placement: 'right',
    ...customTextIconProps,
  }

  const Inner = () => (
    <>
      <TextIcon {...textIconProps} size={textIconProps.size} allowUserSelect>
        <span className={styles.name}>{tagName}</span>
      </TextIcon>

      {onRemoveTag && (
        <button
          className={styles.close}
          onClick={() => {
            onRemoveTag(tag)
          }}
          aria-label={intl.formatMessage({
            defaultMessage: 'Remove',
            id: 'xCkDtt',
            description: 'src/components/Tag/TitleTag.tsx',
          })}
        >
          <Icon icon={IconTimes} color="grey" />
        </button>
      )}

      {hasCount && tag?.numArticles ? (
        <span className={styles.count}>{tag.numArticles}</span>
      ) : null}
    </>
  )
  return is !== 'span' ? (
    <Link {...path} legacyBehavior>
      <a className={tagClasses}>
        <Inner />
      </a>
    </Link>
  ) : (
    <span className={tagClasses}>
      <Inner />
    </span>
  )
}

TitleTag.fragments = tagFragments
