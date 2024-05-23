import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { toPath } from '~/common/utils'
import { Icon, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface TitleTagProps {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
  active?: boolean
  is?: 'a' | 'span'
  onRemoveTag?: (tag: DigestTagFragment) => void
}

export const TitleTag = ({
  tag,
  textIconProps: customTextIconProps,
  active,
  is,
  onRemoveTag,
}: TitleTagProps) => {
  const intl = useIntl()
  const tagClasses = classNames({
    [styles.tag]: true,
    [styles.title]: 'title',
    [styles.active]: active,
    [styles.disabled]: !!(is === 'span'),
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
    icon: <Icon icon={IconHashTag} color="white" />,
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
            id: 'G/yZLu',
          })}
        >
          <Icon icon={IconTimes} color="grey" />
        </button>
      )}
    </>
  )
  return is !== 'span' ? (
    <Link {...path} className={tagClasses}>
      <Inner />
    </Link>
  ) : (
    <span className={tagClasses}>
      <Inner />
    </span>
  )
}

TitleTag.fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      numArticles
      numAuthors
    }
  `,
}
