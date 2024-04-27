import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_CIRCLE_AVATAR_DEFAULT from '@/public/static/icons/circle-avatar-default.svg'
import { TEST_ID } from '~/common/enums'
import { ResponsiveImage } from '~/components'
import { AvatarCircleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type CircleAvatarSize = 'xl' | 'xxl' | 'xxxl'

export interface CircleAvatarProps {
  circle?: AvatarCircleFragment
  size?: CircleAvatarSize
  src?: string | null
  inEditor?: boolean
}

const fragments = {
  circle: gql`
    fragment AvatarCircle on Circle {
      avatar
    }
  `,
}

export const CircleAvatar = (props: CircleAvatarProps) => {
  const { circle, size = 'xl', src, inEditor } = props
  const source = src || circle?.avatar || ICON_CIRCLE_AVATAR_DEFAULT
  const isFallback =
    (!src && !circle?.avatar) || source.indexOf('data:image') >= 0
  const avatarClasses = classNames({
    [styles.avatar]: true,
    [styles[size]]: true,
  })

  return (
    <div className={avatarClasses} data-test-id={TEST_ID.CIRCLE_AVATAR}>
      <ResponsiveImage
        url={source}
        width={144}
        height={144}
        disabled={isFallback || inEditor}
      />
    </div>
  )
}

CircleAvatar.fragments = fragments
