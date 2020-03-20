import classNames from 'classnames'

import { ReactComponent as AddMedium } from './icons/add-md.svg'
import { ReactComponent as Add } from './icons/add.svg'
import { ReactComponent as ArchiveMedium } from './icons/archive-md.svg'
import { ReactComponent as AvatarLogo } from './icons/avatar-logo.svg'
import { ReactComponent as BackLarge } from './icons/back-lg.svg'
import { ReactComponent as BookmarkActive } from './icons/bookmark-active.svg'
import { ReactComponent as BookmarkMedium } from './icons/bookmark-md.svg'
import { ReactComponent as Bookmark } from './icons/bookmark.svg'
import { ReactComponent as CameraMedium } from './icons/camera-md.svg'
import { ReactComponent as Camera } from './icons/camera.svg'
import { ReactComponent as CheckActive } from './icons/checkbox-check-active.svg'
import { ReactComponent as CheckInactive } from './icons/checkbox-check-inactive.svg'
import { ReactComponent as Clear } from './icons/clear.svg'
import { ReactComponent as CloseLarge } from './icons/close-lg.svg'
import { ReactComponent as Collapse } from './icons/collapse.svg'
import { ReactComponent as CollectionMedium } from './icons/collection-md.svg'
import { ReactComponent as Comment } from './icons/comment.svg'
import { ReactComponent as DeleteDraftMedium } from './icons/delete-draft-md.svg'
import { ReactComponent as DeleteDraftXS } from './icons/delete-draft-xs.svg'
import { ReactComponent as DotDivider } from './icons/dot-divider.svg'
import { ReactComponent as Down } from './icons/down.svg'
import { ReactComponent as DownVoteActive } from './icons/downvote-active.svg'
import { ReactComponent as DownVote } from './icons/downvote.svg'
import { ReactComponent as DraftMedium } from './icons/draft-md.svg'
import { ReactComponent as EditXS } from './icons/edit-xs.svg'
import { ReactComponent as Edit } from './icons/edit.svg'
import { ReactComponent as EmptyWarning } from './icons/empty-warning.svg'
import { ReactComponent as Expand } from './icons/expand.svg'
import { ReactComponent as External } from './icons/external.svg'
import { ReactComponent as FollowActiveLarge } from './icons/follow-active-lg.svg'
import { ReactComponent as FollowLarge } from './icons/follow-lg.svg'
import { ReactComponent as HashTag } from './icons/hashtag.svg'
import { ReactComponent as HelpMedium } from './icons/help-md.svg'
import { ReactComponent as HistoryMedium } from './icons/history-md.svg'
import { ReactComponent as HomeActiveLarge } from './icons/home-active-lg.svg'
import { ReactComponent as HomeLarge } from './icons/home-lg.svg'
import { ReactComponent as IPFSMedium } from './icons/ipfs-md.svg'
import { ReactComponent as LeftLarge } from './icons/left-lg.svg'
import { ReactComponent as Left } from './icons/left.svg'
import { ReactComponent as LikeMedium } from './icons/like-md.svg'
import { ReactComponent as Like } from './icons/like.svg'
import { ReactComponent as Link } from './icons/link.svg'
import { ReactComponent as LogoGraph } from './icons/logo-graph.svg'
import { ReactComponent as Logo } from './icons/logo.svg'
import { ReactComponent as LogoutMedium } from './icons/logout-md.svg'
import { ReactComponent as Max } from './icons/max.svg'
import { ReactComponent as Min } from './icons/min.svg'
import { ReactComponent as MoreLarge } from './icons/more-lg.svg'
import { ReactComponent as More } from './icons/more.svg'
import { ReactComponent as MuteMedium } from './icons/mute-md.svg'
import { ReactComponent as NotificationActiveLarge } from './icons/notification-active-lg.svg'
import { ReactComponent as NotificationLarge } from './icons/notification-lg.svg'
import { ReactComponent as Pen } from './icons/pen.svg'
import { ReactComponent as PinMedium } from './icons/pin-md.svg'
import { ReactComponent as ProfileMedium } from './icons/profile-md.svg'
import { ReactComponent as Reload } from './icons/reload.svg'
import { ReactComponent as RemoveMedium } from './icons/remove-md.svg'
import { ReactComponent as Right } from './icons/right.svg'
import { ReactComponent as SearchLarge } from './icons/search-lg.svg'
import { ReactComponent as SearchMedium } from './icons/search-md.svg'
import { ReactComponent as Search } from './icons/search.svg'
import { ReactComponent as SettingsMedium } from './icons/settings-md.svg'
import { ReactComponent as Share } from './icons/share.svg'
import { ReactComponent as Sort } from './icons/sort.svg'
import { ReactComponent as Spinner } from './icons/spinner.svg'
import { ReactComponent as UnMuteMedium } from './icons/unmute-md.svg'
import { ReactComponent as UnPinMedium } from './icons/unpin-md.svg'
import { ReactComponent as Up } from './icons/up.svg'
import { ReactComponent as UpVoteActive } from './icons/upvote-active.svg'
import { ReactComponent as UpVote } from './icons/upvote.svg'
import { ReactComponent as User } from './icons/user.svg'
import { ReactComponent as ViewModeComfortable } from './icons/view-mode-comfortable.svg'
import { ReactComponent as ViewModeCompact } from './icons/view-mode-compact.svg'
import { ReactComponent as ViewModeDefault } from './icons/view-mode-default.svg'
import { ReactComponent as Volume } from './icons/volume.svg'
import Live from './Live'
import styles from './styles.css'

export type IconSize = 'xs' | 'sm' | 'md-s' | 'md' | 'lg' | 'xl' | 'xxl'

export type IconColor =
  | 'white'
  | 'black'
  | 'grey-dark'
  | 'grey'
  | 'grey-light'
  | 'grey-lighter'
  | 'green'
  | 'gold'

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
  Add: withIcon(Add),
  AddMedium: withIcon(AddMedium),
  ArchiveMedium: withIcon(ArchiveMedium),
  AvatarLogo: withIcon(AvatarLogo),
  BackLarge: withIcon(BackLarge),
  Bookmark: withIcon(Bookmark),
  BookmarkActive: withIcon(BookmarkActive),
  BookmarkMedium: withIcon(BookmarkMedium),
  Camera: withIcon(Camera),
  CameraMedium: withIcon(CameraMedium),
  CheckActive: withIcon(CheckActive),
  CheckInactive: withIcon(CheckInactive),
  Clear: withIcon(Clear),
  CloseLarge: withIcon(CloseLarge),
  Collapse: withIcon(Collapse),
  CollectionMedium: withIcon(CollectionMedium),
  Comment: withIcon(Comment),
  DeleteDraftMedium: withIcon(DeleteDraftMedium),
  DeleteDraftXS: withIcon(DeleteDraftXS),
  DotDivider: withIcon(props => (
    <DotDivider style={{ width: 18, height: 18 }} {...props} />
  )),
  Down: withIcon(Down),
  DownVote: withIcon(DownVote),
  DownVoteActive: withIcon(DownVoteActive),
  DraftMedium: withIcon(DraftMedium),
  Edit: withIcon(Edit),
  EditXS: withIcon(EditXS),
  EmptyWarning: withIcon(EmptyWarning),
  Expand: withIcon(Expand),
  External: withIcon(External),
  FollowActiveLarge: withIcon(FollowActiveLarge),
  FollowLarge: withIcon(FollowLarge),
  HashTag: withIcon(HashTag),
  HelpMedium: withIcon(HelpMedium),
  HistoryMedium: withIcon(HistoryMedium),
  HomeActiveLarge: withIcon(HomeActiveLarge),
  HomeLarge: withIcon(HomeLarge),
  IPFSMedium: withIcon(IPFSMedium),
  Left: withIcon(Left),
  LeftLarge: withIcon(LeftLarge),
  Like: withIcon(Like),
  LikeMedium: withIcon(LikeMedium),
  Link: withIcon(Link),
  Live,
  Logo: withIcon(props => (
    <Logo style={{ width: 97, height: 20 }} {...props} />
  )),
  LogoGraph: withIcon(props => (
    <LogoGraph style={{ width: 48, height: 33 }} {...props} />
  )),
  LogoutMedium: withIcon(LogoutMedium),
  Max: withIcon(Max),
  Min: withIcon(Min),
  More: withIcon(More),
  MoreLarge: withIcon(MoreLarge),
  MuteMedium: withIcon(MuteMedium),
  NotificationActiveLarge: withIcon(NotificationActiveLarge),
  NotificationLarge: withIcon(NotificationLarge),
  Pen: withIcon(Pen),
  PinMedium: withIcon(PinMedium),
  ProfileMedium: withIcon(ProfileMedium),
  Reload: withIcon(Reload),
  RemoveMedium: withIcon(RemoveMedium),
  Right: withIcon(Right),
  Search: withIcon(Search),
  SearchLarge: withIcon(SearchLarge),
  SearchMedium: withIcon(SearchMedium),
  SettingsMedium: withIcon(SettingsMedium),
  Share: withIcon(Share),
  Sort: withIcon(Sort),
  Spinner: withIcon(({ className, ...restProps }) => (
    <Spinner className={`u-motion-spin ${className}`} {...restProps} />
  )),
  UnMuteMedium: withIcon(UnMuteMedium),
  UnPinMedium: withIcon(UnPinMedium),
  Up: withIcon(Up),
  UpVote: withIcon(UpVote),
  UpVoteActive: withIcon(UpVoteActive),
  User: withIcon(User),
  ViewModeComfortable: withIcon(ViewModeComfortable),
  ViewModeCompact: withIcon(ViewModeCompact),
  ViewModeDefault: withIcon(ViewModeDefault),
  Volume: withIcon(Volume)
}
