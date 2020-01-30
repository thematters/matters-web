import classNames from 'classnames'

import { ReactComponent as CheckActive } from '~/static/icons/checkbox-check-active.svg'
import { ReactComponent as CheckError } from '~/static/icons/checkbox-check-error.svg'
import { ReactComponent as CheckInactive } from '~/static/icons/checkbox-check-inactive.svg'
import { ReactComponent as UnCheck } from '~/static/icons/checkbox-uncheck.svg'
import { ReactComponent as DotDivider } from '~/static/icons/dot-divider.svg'
import { ReactComponent as SeedBadge } from '~/static/icons/early-user-badge.svg'
import { ReactComponent as EmptyWarning } from '~/static/icons/empty-warning.svg'
import { ReactComponent as External } from '~/static/icons/external.svg'
import { ReactComponent as Loading } from '~/static/icons/loading.svg'
import { ReactComponent as Logo } from '~/static/icons/logo.svg'
import { ReactComponent as Reload } from '~/static/icons/reload.svg'
import { ReactComponent as Spinner } from '~/static/icons/spinner.svg'
import { ReactComponent as Trends } from '~/static/icons/trends.svg'

import { ReactComponent as AddMedium } from './icons/add-md.svg'
import { ReactComponent as Add } from './icons/add.svg'
import { ReactComponent as ArchiveMedium } from './icons/archive-md.svg'
import { ReactComponent as BookmarkMedium } from './icons/bookmark-md.svg'
import { ReactComponent as Bookmark } from './icons/bookmark.svg'
import { ReactComponent as CameraMedium } from './icons/camera-md.svg'
import { ReactComponent as Camera } from './icons/camera.svg'
import { ReactComponent as Clear } from './icons/clear.svg'
import { ReactComponent as Collapse } from './icons/collapse.svg'
import { ReactComponent as CollectionMedium } from './icons/collection-md.svg'
import { ReactComponent as Comment } from './icons/comment.svg'
import { ReactComponent as Down } from './icons/down.svg'
import { ReactComponent as DownVote } from './icons/downvote.svg'
import { ReactComponent as DraftMedium } from './icons/draft-md.svg'
import { ReactComponent as Edit } from './icons/edit.svg'
import { ReactComponent as Expand } from './icons/expand.svg'
import { ReactComponent as HashTag } from './icons/hashtag.svg'
import { ReactComponent as HelpMedium } from './icons/help-md.svg'
import { ReactComponent as HistoryMedium } from './icons/history-md.svg'
import { ReactComponent as IPFSMedium } from './icons/ipfs-md.svg'
import { ReactComponent as Left } from './icons/left.svg'
import { ReactComponent as LikeMedium } from './icons/like-md.svg'
import { ReactComponent as Like } from './icons/like.svg'
import { ReactComponent as Link } from './icons/link.svg'
import { ReactComponent as LogoutMedium } from './icons/logout-md.svg'
import { ReactComponent as Max } from './icons/max.svg'
import { ReactComponent as Min } from './icons/min.svg'
import { ReactComponent as More } from './icons/more.svg'
import { ReactComponent as MuteMedium } from './icons/mute-md.svg'
import { ReactComponent as NotificationLarge } from './icons/notification-lg.svg'
import { ReactComponent as Pen } from './icons/pen.svg'
import { ReactComponent as PinMedium } from './icons/pin-md.svg'
import { ReactComponent as ProfileMedium } from './icons/profile-md.svg'
import { ReactComponent as RemoveMedium } from './icons/remove-md.svg'
import { ReactComponent as Right } from './icons/right.svg'
import { ReactComponent as SearchLarge } from './icons/search-lg.svg'
import { ReactComponent as Search } from './icons/search.svg'
import { ReactComponent as SettingsMedium } from './icons/settings-md.svg'
import { ReactComponent as Share } from './icons/share.svg'
import { ReactComponent as Sort } from './icons/sort.svg'
import { ReactComponent as UnMuteMedium } from './icons/unmute-md.svg'
import { ReactComponent as UnPinMedium } from './icons/unpin-md.svg'
import { ReactComponent as Up } from './icons/up.svg'
import { ReactComponent as UpVote } from './icons/upvote.svg'
import Live from './Live'
import styles from './styles.css'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type IconColor =
  | 'white'
  | 'black'
  | 'grey-dark'
  | 'grey'
  | 'grey-lighter'
  | 'green'

export interface IconProps {
  size?: IconSize
  color?: IconColor
  [key: string]: any
}

export const withIcon = (
  WrappedIcon: React.FunctionComponent<React.SVGProps<HTMLOrSVGElement>>
) => (props: IconProps) => {
  const { size = '', color = '', className, ...restProps } = props
  const iconClass = classNames({
    icon: true,
    [size]: !!size,
    [color]: !!color,
    [className]: !!className
  })

  return (
    <>
      <WrappedIcon className={iconClass} aria-hidden="true" {...restProps} />

      <style jsx global>
        {styles}
      </style>
    </>
  )
}

/**
 * `<Icon>` component that render as `<svg>`
 *
 * Usage:
 *
 * ```tsx
 * import { Icon } from '~/components'
 *
 * // with "size"
 * <Icon.Add size="sm" />
 *
 * // with "color"
 * <Icon.Add color="green" />
 *
 * // with custom styles
 * <Icon.Add style={{ width: 97, height: 20 }} />
 *
 * ```
 */

export const Icon = {
  UpVote: withIcon(UpVote),
  DownVote: withIcon(DownVote),
  Camera: withIcon(Camera),
  Search: withIcon(Search),
  Clear: withIcon(Clear),
  CollectionMedium: withIcon(CollectionMedium),
  Like: withIcon(Like),
  Bookmark: withIcon(Bookmark),
  More: withIcon(More),
  Share: withIcon(Share),
  Comment: withIcon(Comment),
  ArchiveMedium: withIcon(ArchiveMedium),
  AddMedium: withIcon(AddMedium),
  Add: withIcon(Add),
  BookmarkMedium: withIcon(BookmarkMedium),
  CameraMedium: withIcon(CameraMedium),
  Collapse: withIcon(Collapse),
  Down: withIcon(Down),
  DraftMedium: withIcon(DraftMedium),
  Edit: withIcon(Edit),
  Expand: withIcon(Expand),
  HelpMedium: withIcon(HelpMedium),
  HashTag: withIcon(HashTag),
  HistoryMedium: withIcon(HistoryMedium),
  Left: withIcon(Left),
  IPFSMedium: withIcon(IPFSMedium),
  LikeMedium: withIcon(LikeMedium),
  Link: withIcon(Link),
  LogoutMedium: withIcon(LogoutMedium),
  Max: withIcon(Max),
  Min: withIcon(Min),
  NotificationLarge: withIcon(NotificationLarge),
  UnPinMedium: withIcon(UnPinMedium),
  MuteMedium: withIcon(MuteMedium),
  UnMuteMedium: withIcon(UnMuteMedium),
  Pen: withIcon(Pen),
  PinMedium: withIcon(PinMedium),
  ProfileMedium: withIcon(ProfileMedium),
  RemoveMedium: withIcon(RemoveMedium),
  SettingsMedium: withIcon(SettingsMedium),
  SearchLarge: withIcon(SearchLarge),
  Right: withIcon(Right),
  Sort: withIcon(Sort),
  Up: withIcon(Up),

  //
  CheckActive: withIcon(CheckActive),
  CheckError: withIcon(CheckError),
  CheckInactive: withIcon(CheckInactive),
  DotDivider: withIcon(props => (
    <DotDivider style={{ width: 18, height: 18 }} {...props} />
  )),
  External: withIcon(External),
  EmptyWarning: withIcon(EmptyWarning),
  Live,
  Loading: withIcon(Loading),
  Logo: withIcon(Logo),
  Reload: withIcon(Reload),
  SeedBadge: withIcon(SeedBadge),
  Spinner: withIcon(({ className, ...restProps }) => (
    <Spinner className={`u-motion-spin ${className}`} {...restProps} />
  )),
  Trends: withIcon(Trends),
  UnCheck: withIcon(UnCheck)
}
