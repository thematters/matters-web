import classNames from 'classnames'
import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import IconCircleTimes from '@/public/static/icons/24px/circle-times-fill.svg'
import IconHashTag from '@/public/static/icons/24px/hashtag.svg'
import { TEST_ID } from '~/common/enums'
import { Icon, TextIcon, TextIconProps } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface InlineTagProps {
  tag: DigestTagFragment
  textIconProps?: TextIconProps
  active?: boolean
  onRemoveTag?: (tag: DigestTagFragment) => void
  onClick?: () => void
}

export const InlineTag = ({
  tag,
  textIconProps: customTextIconProps,
  active,
  onRemoveTag,
  onClick,
}: InlineTagProps) => {
  const intl = useIntl()

  const tagClasses = classNames({
    [styles.inline]: 'inline',
    [styles.active]: active,
    [styles.clickable]: !!onClick,
    [styles.disabled]: !onClick,
  })

  const tagName = tag.content

  const textIconProps: TextIconProps = {
    size: 13,
    weight: 'normal',
    spacing: 0,
    color: active ? 'white' : 'greyDarker',
    icon: <Icon icon={IconHashTag} color="greyDark" />,
    placement: 'right',
    ...customTextIconProps,
  }

  return (
    <span
      className={tagClasses}
      onClick={onClick}
      data-test-id={TEST_ID.DIGEST_TAG_INLINE}
    >
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
          <Icon icon={IconCircleTimes} color="grey" />
        </button>
      )}
    </span>
  )
}

InlineTag.fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      numArticles
    }
  `,
}
