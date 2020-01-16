import classNames from 'classnames'

import { ReactComponent as Add } from '~/static/icons/add.svg'
import { ReactComponent as Archive } from '~/static/icons/archive.svg'
import { ReactComponent as ArrowRightGreenCircle } from '~/static/icons/arrow-right-green-circle.svg'
import { ReactComponent as ArrowRightGreenSmall } from '~/static/icons/arrow-right-green-small.svg'
import { ReactComponent as ArrowRightGreen } from '~/static/icons/arrow-right-green.svg'
import { ReactComponent as ArrowRightWhite } from '~/static/icons/arrow-right-white.svg'
import { ReactComponent as ArrowUpRight } from '~/static/icons/arrow-up-right.svg'
import { ReactComponent as Block } from '~/static/icons/block.svg'
import { ReactComponent as BookmarkRegularActive } from '~/static/icons/bookmark-regular-active.svg'
import { ReactComponent as BookmarkRegularInactive } from '~/static/icons/bookmark-regular-inactive.svg'
import { ReactComponent as BookmarkSmallActive } from '~/static/icons/bookmark-small-active.svg'
import { ReactComponent as BookmarkSmallInactive } from '~/static/icons/bookmark-small-inactive.svg'
import { ReactComponent as Box } from '~/static/icons/box.svg'
import { ReactComponent as CameraGreen } from '~/static/icons/camera-green.svg'
import { ReactComponent as Camera } from '~/static/icons/camera-white.svg'
import { ReactComponent as CheckActive } from '~/static/icons/checkbox-check-active.svg'
import { ReactComponent as CheckError } from '~/static/icons/checkbox-check-error.svg'
import { ReactComponent as CheckInactive } from '~/static/icons/checkbox-check-inactive.svg'
import { ReactComponent as UnCheck } from '~/static/icons/checkbox-uncheck.svg'
import { ReactComponent as ChevronRight } from '~/static/icons/chevron-right.svg'
import { ReactComponent as Close } from '~/static/icons/close.svg'
import { ReactComponent as CollapseBranch } from '~/static/icons/collapse-branch.svg'
import { ReactComponent as Collapse } from '~/static/icons/collapse.svg'
import { ReactComponent as CollectionEdit } from '~/static/icons/collection-edit.svg'
import { ReactComponent as Collection } from '~/static/icons/collection.svg'
import { ReactComponent as CommentRegular } from '~/static/icons/comment-regular.svg'
import { ReactComponent as CommentSmall } from '~/static/icons/comment-small.svg'
import { ReactComponent as Copy } from '~/static/icons/copy.svg'
import { ReactComponent as DeleteBlackCircle } from '~/static/icons/delete-black-circle.svg'
import { ReactComponent as DeleteRedCircle } from '~/static/icons/delete-red-circle.svg'
import { ReactComponent as DislikeActive } from '~/static/icons/dislike-active.svg'
import { ReactComponent as DislikeInactive } from '~/static/icons/dislike-inactive.svg'
import { ReactComponent as DotDivider } from '~/static/icons/dot-divider.svg'
import { ReactComponent as Drag } from '~/static/icons/drag.svg'
import { ReactComponent as SeedBadge } from '~/static/icons/early-user-badge.svg'
import { ReactComponent as EmptyBookmark } from '~/static/icons/empty-bookmark.svg'
import { ReactComponent as EmptyComment } from '~/static/icons/empty-comment.svg'
import { ReactComponent as EmptyLike } from '~/static/icons/empty-like.svg'
import { ReactComponent as EmptyNotification } from '~/static/icons/empty-notification.svg'
import { ReactComponent as EmptyReadingHistory } from '~/static/icons/empty-reading-history.svg'
import { ReactComponent as EmptyWarning } from '~/static/icons/empty-warning.svg'
import { ReactComponent as Expand } from '~/static/icons/expand.svg'
import { ReactComponent as Extend } from '~/static/icons/extend.svg'
import { ReactComponent as External } from '~/static/icons/external.svg'
import { ReactComponent as Fail } from '~/static/icons/fail.svg'
import { ReactComponent as Flag } from '~/static/icons/flag.svg'
import { ReactComponent as FooterFacebook } from '~/static/icons/footer-facebook.svg'
import { ReactComponent as FooterInstagram } from '~/static/icons/footer-instagram.svg'
import { ReactComponent as FooterMedium } from '~/static/icons/footer-medium.svg'
import { ReactComponent as FooterTelegram } from '~/static/icons/footer-telegram.svg'
import { ReactComponent as FooterTwitter } from '~/static/icons/footer-twitter.svg'
import { ReactComponent as FooterWeChat } from '~/static/icons/footer-wechat.svg'
import { ReactComponent as HashTag } from '~/static/icons/hashtag.svg'
import { ReactComponent as Help } from '~/static/icons/help.svg'
import { ReactComponent as LikeActive } from '~/static/icons/like-active.svg'
import { ReactComponent as LikeInactive } from '~/static/icons/like-inactive.svg'
import { ReactComponent as Like } from '~/static/icons/like.svg'
import { ReactComponent as Loading } from '~/static/icons/loading.svg'
import { ReactComponent as Logo } from '~/static/icons/logo.svg'
import { ReactComponent as LogOut } from '~/static/icons/logout.svg'
import { ReactComponent as Me } from '~/static/icons/me.svg'
import { ReactComponent as Menu } from '~/static/icons/menu.svg'
import { ReactComponent as MoreContent } from '~/static/icons/more-content.svg'
import { ReactComponent as MoreRegular } from '~/static/icons/more-regular.svg'
import { ReactComponent as MoreSmall } from '~/static/icons/more-small.svg'
import { ReactComponent as Notification } from '~/static/icons/notification.svg'
import { ReactComponent as Pen } from '~/static/icons/pen.svg'
import { ReactComponent as PinToTop } from '~/static/icons/pin-to-top.svg'
import { ReactComponent as PostDark } from '~/static/icons/post-dark.svg'
import { ReactComponent as Post } from '~/static/icons/post.svg'
import { ReactComponent as ReadingHistoryGreen } from '~/static/icons/reading-history-green.svg'
import { ReactComponent as ReadingHistory } from '~/static/icons/reading-history.svg'
import { ReactComponent as Reload } from '~/static/icons/reload.svg'
import { ReactComponent as Remove } from '~/static/icons/remove.svg'
import { ReactComponent as Search } from '~/static/icons/search.svg'
import { ReactComponent as Settings } from '~/static/icons/settings.svg'
import { ReactComponent as ShareDouban } from '~/static/icons/share-douban.svg'
import { ReactComponent as ShareEmail } from '~/static/icons/share-email.svg'
import { ReactComponent as ShareFacebook } from '~/static/icons/share-facebook.svg'
import { ReactComponent as ShareLine } from '~/static/icons/share-line.svg'
import { ReactComponent as ShareLink } from '~/static/icons/share-link.svg'
import { ReactComponent as ShareSmall } from '~/static/icons/share-small.svg'
import { ReactComponent as ShareTelegram } from '~/static/icons/share-telegram.svg'
import { ReactComponent as ShareTwitter } from '~/static/icons/share-twitter.svg'
import { ReactComponent as ShareWeChat } from '~/static/icons/share-wechat.svg'
import { ReactComponent as ShareWeibo } from '~/static/icons/share-weibo.svg'
import { ReactComponent as ShareWhatsApp } from '~/static/icons/share-whatsapp.svg'
import { ReactComponent as Share } from '~/static/icons/share.svg'
import { ReactComponent as Spinner } from '~/static/icons/spinner.svg'
import { ReactComponent as Sticky } from '~/static/icons/sticky.svg'
import { ReactComponent as TagEdit } from '~/static/icons/tag-edit.svg'
import { ReactComponent as Trends } from '~/static/icons/trends.svg'
import { ReactComponent as Unblock } from '~/static/icons/unblock.svg'
import { ReactComponent as UnCollapse } from '~/static/icons/uncollapse.svg'
import { ReactComponent as UnPin } from '~/static/icons/unpin.svg'
import { ReactComponent as UnSticky } from '~/static/icons/unsticky.svg'
import { ReactComponent as Write } from '~/static/icons/write.svg'

import Live from './Live'
import styles from './styles.css'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type IconColor = 'white' | 'black' | 'grey-dark' | 'grey' | 'green'

export interface IconProps {
  size?: IconSize
  color?: IconColor
  [key: string]: any
}

const withIcon = (
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
  Archive: withIcon(Archive),
  ArrowRightGreen: withIcon(props => (
    <ArrowRightGreen style={{ width: 12, height: 6 }} {...props} />
  )),
  ArrowRightGreenCircle: withIcon(ArrowRightGreenCircle),
  ArrowRightGreenSmall: withIcon(ArrowRightGreenSmall),
  ArrowRightWhite: withIcon(ArrowRightWhite),
  ArrowUpRight: withIcon(ArrowUpRight),
  Block: withIcon(Block),
  BookmarkRegularActive: withIcon(BookmarkRegularActive),
  BookmarkRegularInactive: withIcon(BookmarkRegularInactive),
  BookmarkSmallActive: withIcon(BookmarkSmallActive),
  BookmarkSmallInactive: withIcon(BookmarkSmallInactive),
  Box: withIcon(Box),
  Camera: withIcon(Camera),
  CameraGreen: withIcon(CameraGreen),
  CheckActive: withIcon(CheckActive),
  CheckError: withIcon(CheckError),
  CheckInactive: withIcon(CheckInactive),
  ChevronRight: withIcon(ChevronRight),
  Close: withIcon(Close),
  Collapse: withIcon(Collapse),
  CollapseBranch: withIcon(CollapseBranch),
  Collection: withIcon(Collection),
  CollectionEdit: withIcon(CollectionEdit),
  CommentRegular: withIcon(CommentRegular),
  CommentSmall: withIcon(CommentSmall),
  Copy: withIcon(Copy),
  DeleteBlackCircle: withIcon(DeleteBlackCircle),
  DeleteRedCircle: withIcon(DeleteRedCircle),
  DislikeActive: withIcon(DislikeActive),
  DislikeInactive: withIcon(DislikeInactive),
  DotDivider: withIcon(props => (
    <DotDivider style={{ width: 18, height: 18 }} {...props} />
  )),
  Drag: withIcon(Drag),
  EmptyBookmark: withIcon(EmptyBookmark),
  EmptyComment: withIcon(EmptyComment),
  EmptyLike: withIcon(EmptyLike),
  EmptyNotification: withIcon(EmptyNotification),
  EmptyReadingHistory: withIcon(EmptyReadingHistory),
  EmptyWarning: withIcon(EmptyWarning),
  Expand: withIcon(Expand),
  Extend: withIcon(Extend),
  External: withIcon(External),
  Fail: withIcon(Fail),
  Flag: withIcon(Flag),
  FooterFacebook: withIcon(FooterFacebook),
  FooterInstagram: withIcon(FooterInstagram),
  FooterMedium: withIcon(FooterMedium),
  FooterTelegram: withIcon(FooterTelegram),
  FooterTwitter: withIcon(FooterTwitter),
  FooterWeChat: withIcon(FooterWeChat),
  HashTag: withIcon(HashTag),
  Help: withIcon(props => (
    <Help style={{ width: 14, height: 14 }} {...props} />
  )),
  Like: withIcon(Like),
  LikeActive: withIcon(LikeActive),
  LikeInactive: withIcon(LikeInactive),
  Live,
  Loading: withIcon(Loading),
  Logo: withIcon(Logo),
  LogOut: withIcon(LogOut),
  Me: withIcon(Me),
  Menu: withIcon(Menu),
  MoreContent: withIcon(MoreContent),
  MoreRegular: withIcon(MoreRegular),
  MoreSmall: withIcon(MoreSmall),
  Notification: withIcon(Notification),
  Pen: withIcon(Pen),
  PinToTop: withIcon(PinToTop),
  Post: withIcon(Post),
  PostDark: withIcon(PostDark),
  ReadingHistory: withIcon(ReadingHistory),
  ReadingHistoryGreen: withIcon(ReadingHistoryGreen),
  Reload: withIcon(Reload),
  Remove: withIcon(Remove),
  Search: withIcon(Search),
  SeedBadge: withIcon(SeedBadge),
  Settings: withIcon(Settings),
  Share: withIcon(Share),
  ShareSmall: withIcon(ShareSmall),
  ShareDouban: withIcon(ShareDouban),
  ShareEmail: withIcon(ShareEmail),
  ShareFacebook: withIcon(ShareFacebook),
  ShareLine: withIcon(ShareLine),
  ShareLink: withIcon(ShareLink),
  ShareTelegram: withIcon(ShareTelegram),
  ShareTwitter: withIcon(ShareTwitter),
  ShareWeChat: withIcon(ShareWeChat),
  ShareWeibo: withIcon(ShareWeibo),
  ShareWhatsApp: withIcon(ShareWhatsApp),
  Spinner: withIcon(({ className, ...restProps }) => (
    <Spinner className={`u-motion-spin ${className}`} {...restProps} />
  )),
  Sticky: withIcon(Sticky),
  TagEdit: withIcon(TagEdit),
  Trends: withIcon(Trends),
  Unblock: withIcon(Unblock),
  UnCheck: withIcon(UnCheck),
  UnCollapse: withIcon(UnCollapse),
  UnPin: withIcon(UnPin),
  UnSticky: withIcon(UnSticky),
  Write: withIcon(Write)
}
