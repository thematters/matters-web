import _get from 'lodash/get'
import _isNil from 'lodash/isNil'

import {
  Button,
  TextIcon,
  Translate,
  useMutation,
  withIcon,
} from '~/components'
import TOGGLE_FOLLOW_USER from '~/components/GQL/mutations/toggleFollowUser'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { TEXT } from '~/common/enums'

import { ReactComponent as IconProfileFollow } from '@/public/static/icons/48px/profile-follow.svg'

import { ToggleFollowUser } from '~/components/GQL/mutations/__generated__/ToggleFollowUser'
import { FollowButtonUserPrivate } from './__generated__/FollowButtonUserPrivate'

interface FollowUserProps {
  user: Partial<FollowButtonUserPrivate>
  inProfile?: boolean
}

const FollowUser = ({ user, inProfile }: FollowUserProps) => {
  const [follow] = useMutation<ToggleFollowUser>(TOGGLE_FOLLOW_USER, {
    variables: { id: user.id, enabled: true },
    optimisticResponse:
      !_isNil(user.id) && !_isNil(user.isFollower)
        ? {
            toggleFollowUser: {
              id: user.id,
              isFollowee: true,
              isFollower: user.isFollower,
              __typename: 'User',
            },
          }
        : undefined,
    update: (cache) => {
      const userName = _get(user, 'userName', null)
      updateUserFollowerCount({ cache, type: 'increment', userName })
      updateViewerFolloweeCount({ cache, type: 'increment' })
    },
  })

  return (
    <Button
      size={inProfile ? undefined : ['3rem', '1.5rem']}
      textColor="green"
      textActiveColor="white"
      bgColor={inProfile ? 'green' : undefined}
      bgActiveColor={inProfile ? undefined : 'green'}
      borderColor={inProfile ? undefined : 'green'}
      onClick={() => follow()}
      aria-label={TEXT.zh_hant.follow}
    >
      {inProfile && withIcon(IconProfileFollow)({ size: 'xl' })}
      {!inProfile && (
        <TextIcon weight="md" size="xs">
          <Translate id="follow" />
        </TextIcon>
      )}
    </Button>
  )
}

export default FollowUser
