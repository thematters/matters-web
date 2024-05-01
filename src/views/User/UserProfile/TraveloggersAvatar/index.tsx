import { Avatar, AvatarSize, Tooltip, Translate } from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import LogbookDialog from './LogbookDialog'

type TraveloggersAvatarProps = {
  user: NonNullable<UserProfileUserPublicQuery['user']>
  isMe: boolean
  size?: AvatarSize
}

const TraveloggersAvatar: React.FC<TraveloggersAvatarProps> = ({
  user,
  isMe,
  size = 120,
}) => {
  return (
    <Tooltip
      content={
        <Translate
          zh_hant={`查看 ${user.displayName} 的航行日誌`}
          zh_hans={`查看 ${user.displayName} 的航行日志`}
          en={`View Logbooks owned by ${user.displayName}`}
        />
      }
    >
      <LogbookDialog
        title={
          <Translate
            en={isMe ? 'My Logbook' : `${user.displayName}'s Logbook`}
            zh_hant={isMe ? '我的 Logbook' : `${user.displayName} 的航行日誌`}
            zh_hans={isMe ? '我的 Logbook' : `${user.displayName} 的航行日志`}
          />
        }
        address={user.info.cryptoWallet?.address as string}
      >
        {({ openDialog }) => (
          <button type="button" onClick={openDialog} aria-haspopup="dialog">
            <Avatar size={size} user={user} inProfile />
          </button>
        )}
      </LogbookDialog>
    </Tooltip>
  )
}

export default TraveloggersAvatar
