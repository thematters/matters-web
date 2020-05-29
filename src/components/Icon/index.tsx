import classNames from 'classnames'

import { ReactComponent as Add } from './icons/add.svg'
import { ReactComponent as AppreciationMAX } from './icons/appreciation-max.svg'
import { ReactComponent as ArchiveMedium } from './icons/archive-md.svg'
import { ReactComponent as AvatarLogo } from './icons/avatar-logo.svg'
import { ReactComponent as BackLarge } from './icons/back-lg.svg'
import { ReactComponent as BookmarkActive } from './icons/bookmark-active.svg'
import { ReactComponent as BookmarkMedium } from './icons/bookmark-md.svg'
import { ReactComponent as Bookmark } from './icons/bookmark.svg'
import { ReactComponent as CameraMedium } from './icons/camera-md.svg'
import { ReactComponent as CheckActive } from './icons/checkbox-check-active.svg'
import { ReactComponent as CheckInactive } from './icons/checkbox-check-inactive.svg'
import { ReactComponent as Clear } from './icons/clear.svg'
import { ReactComponent as CloseLarge } from './icons/close-lg.svg'
import { ReactComponent as Collapse } from './icons/collapse.svg'
import { ReactComponent as CollectionMedium } from './icons/collection-md.svg'
import { ReactComponent as Comment } from './icons/comment.svg'
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
import { ReactComponent as ExternalLink } from './icons/external-link.svg'
import { ReactComponent as External } from './icons/external.svg'
import { ReactComponent as HashTag } from './icons/hashtag.svg'
import { ReactComponent as Heart } from './icons/heart.svg'
import { ReactComponent as HelpMedium } from './icons/help-md.svg'
import { ReactComponent as HistoryMedium } from './icons/history-md.svg'
import { ReactComponent as IPFSMedium } from './icons/ipfs-md.svg'
import { ReactComponent as LeftLarge } from './icons/left-lg.svg'
import { ReactComponent as Left } from './icons/left.svg'
import { ReactComponent as LikeMedium } from './icons/like-md.svg'
import { ReactComponent as Like } from './icons/like.svg'
import { ReactComponent as Link } from './icons/link.svg'
import { ReactComponent as LogoGraph } from './icons/logo-graph.svg'
import { ReactComponent as Logo } from './icons/logo.svg'
import { ReactComponent as LogoutMedium } from './icons/logout-md.svg'
import { ReactComponent as MoreLarge } from './icons/more-lg.svg'
import { ReactComponent as More } from './icons/more.svg'
import { ReactComponent as MuteMedium } from './icons/mute-md.svg'
import { ReactComponent as NavFollowActive } from './icons/nav-follow-active.svg'
import { ReactComponent as NavFollow } from './icons/nav-follow.svg'
import { ReactComponent as NavHomeActive } from './icons/nav-home-active.svg'
import { ReactComponent as NavHome } from './icons/nav-home.svg'
import { ReactComponent as NavNotificationActive } from './icons/nav-notification-active.svg'
import { ReactComponent as NavNotification } from './icons/nav-notification.svg'
import { ReactComponent as NavSearch } from './icons/nav-search.svg'
import { ReactComponent as Pen } from './icons/pen.svg'
import { ReactComponent as PinMedium } from './icons/pin-md.svg'
import { ReactComponent as ProfileMedium } from './icons/profile-md.svg'
import { ReactComponent as Reload } from './icons/reload.svg'
import { ReactComponent as RemoveMedium } from './icons/remove-md.svg'
import { ReactComponent as Right } from './icons/right.svg'
import { ReactComponent as SearchMedium } from './icons/search-md.svg'
import { ReactComponent as SettingsMedium } from './icons/settings-md.svg'
import { ReactComponent as Share } from './icons/share.svg'
import { ReactComponent as Sort } from './icons/sort.svg'
import { ReactComponent as Spinner } from './icons/spinner.svg'
import { ReactComponent as UnlockMedium } from './icons/unlock-md.svg'
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
import { ReactComponent as WalletMedium } from './icons/wallet-md.svg'
import { ReactComponent as World } from './icons/world.svg'
import Live from './Live'
import styles from './styles.css'

export type IconSize =
  | 'xs'
  | 'sm'
  | 'md-s'
  | 'md'
  | 'lg'
  | 'xl-m'
  | 'xl'
  | 'xxl'

export type IconColor =
  | 'white'
  | 'black'
  | 'grey-dark'
  | 'grey'
  | 'grey-light'
  | 'grey-lighter'
  | 'green'
  | 'gold'
  | 'red'

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
    [className]: !!className,
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
 * <IconAdd size="sm" />
 *
 * // with "color"
 * <IconAdd color="green" />
 *
 * // with custom styles
 * <IconAdd style={{ width: 97, height: 20 }} />
 *
 * ```
 */
export const IconAdd = withIcon(Add)
export const IconAppreciationMAX = withIcon(AppreciationMAX)
export const IconArchiveMedium = withIcon(ArchiveMedium)
export const IconAvatarLogo = withIcon(AvatarLogo)
export const IconBackLarge = withIcon(BackLarge)
export const IconBookmark = withIcon(Bookmark)
export const IconBookmarkActive = withIcon(BookmarkActive)
export const IconBookmarkMedium = withIcon(BookmarkMedium)
export const IconCameraMedium = withIcon(CameraMedium)
export const IconCheckActive = withIcon(CheckActive)
export const IconCheckInactive = withIcon(CheckInactive)
export const IconClear = withIcon(Clear)
export const IconCloseLarge = withIcon(CloseLarge)
export const IconCollapse = withIcon(Collapse)
export const IconCollectionMedium = withIcon(CollectionMedium)
export const IconComment = withIcon(Comment)
export const IconDeleteDraftXS = withIcon(DeleteDraftXS)
export const IconDotDivider = withIcon((props) => (
  <DotDivider style={{ width: 18, height: 18 }} {...props} />
))
export const IconDown = withIcon(Down)
export const IconDownVote = withIcon(DownVote)
export const IconDownVoteActive = withIcon(DownVoteActive)
export const IconDraftMedium = withIcon(DraftMedium)
export const IconEdit = withIcon(Edit)
export const IconEditXS = withIcon(EditXS)
export const IconEmptyWarning = withIcon(EmptyWarning)
export const IconExpand = withIcon(Expand)
export const IconExternal = withIcon(External)
export const IconExternalLink = withIcon(ExternalLink)
export const IconHashTag = withIcon(HashTag)
export const IconHeart = withIcon(Heart)
export const IconHelpMedium = withIcon(HelpMedium)
export const IconHistoryMedium = withIcon(HistoryMedium)
export const IconIPFSMedium = withIcon(IPFSMedium)
export const IconLeft = withIcon(Left)
export const IconLeftLarge = withIcon(LeftLarge)
export const IconLike = withIcon(Like)
export const IconLikeMedium = withIcon(LikeMedium)
export const IconLink = withIcon(Link)
export const IconLive = Live
export const IconLogo = withIcon((props) => (
  <Logo style={{ width: 97, height: 20 }} {...props} />
))
export const IconLogoGraph = withIcon((props) => (
  <LogoGraph style={{ width: 48, height: 33 }} {...props} />
))
export const IconLogoutMedium = withIcon(LogoutMedium)
export const IconMore = withIcon(More)
export const IconMoreLarge = withIcon(MoreLarge)
export const IconMuteMedium = withIcon(MuteMedium)
export const IconNavFollow = withIcon(NavFollow)
export const IconNavFollowActive = withIcon(NavFollowActive)
export const IconNavHome = withIcon(NavHome)
export const IconNavHomeActive = withIcon(NavHomeActive)
export const IconNavNotification = withIcon(NavNotification)
export const IconNavNotificationActive = withIcon(NavNotificationActive)
export const IconNavSearch = withIcon(NavSearch)
export const IconPen = withIcon(Pen)
export const IconPinMedium = withIcon(PinMedium)
export const IconProfileMedium = withIcon(ProfileMedium)
export const IconReload = withIcon(Reload)
export const IconRemoveMedium = withIcon(RemoveMedium)
export const IconRight = withIcon(Right)
export const IconSearchMedium = withIcon(SearchMedium)
export const IconSettingsMedium = withIcon(SettingsMedium)
export const IconShare = withIcon(Share)
export const IconSort = withIcon(Sort)
export const IconSpinner = withIcon(({ className, ...restProps }) => (
  <Spinner className={`u-motion-spin ${className}`} {...restProps} />
))
export const IconUnlockMedium = withIcon(UnlockMedium)
export const IconUnMuteMedium = withIcon(UnMuteMedium)
export const IconUnPinMedium = withIcon(UnPinMedium)
export const IconUp = withIcon(Up)
export const IconUpVote = withIcon(UpVote)
export const IconUpVoteActive = withIcon(UpVoteActive)
export const IconUser = withIcon(User)
export const IconViewModeComfortable = withIcon(ViewModeComfortable)
export const IconViewModeCompact = withIcon(ViewModeCompact)
export const IconViewModeDefault = withIcon(ViewModeDefault)
export const IconVolume = withIcon(Volume)
export const IconWalletMedium = withIcon(WalletMedium)
export const IconWorld = withIcon(World)
