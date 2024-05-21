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

export interface InlineTagProps {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
  active?: boolean
  is?: 'a' | 'span'
  onRemoveTag?: (tag: DigestTagFragment) => void
  onClick?: () => void
}

export const InlineTag = ({
  tag,
  textIconProps: customTextIconProps,
  active,
  is,
  onRemoveTag,
  onClick,
}: InlineTagProps) => {
  const intl = useIntl()

  const tagClasses = classNames({
    [styles.tag]: true,
    [styles['inline']]: 'inline',
    [styles.active]: active,
    [styles.clickable]: !!onClick,
    [styles.disabled]: !onClick,
  })

  const tagName = tag.content

  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const textIconProps: TextIconProps = {
    size: 13,
    weight: 'normal',
    spacing: 4,
    color: active ? 'white' : 'greyDarker',
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
            id: 'NPNj9D',
            description: 'src/components/Tag/InlineTag.tsx',
          })}
        >
          <Icon icon={IconTimes} color="grey" />
        </button>
      )}
    </>
  )
  return is === 'span' ? (
    <span className={tagClasses} onClick={onClick}>
      <Inner />{' '}
    </span>
  ) : (
    <Link {...path} legacyBehavior>
      <a className={tagClasses} onClick={onClick}>
        <Inner />
      </a>
    </Link>
  )
}

InlineTag.fragments = tagFragments
