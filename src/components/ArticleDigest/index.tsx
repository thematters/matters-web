import CardDigest from './CardDigest'
import DropdownDigest from './DropdownDigest'
import FeatureDigest from './FeatureDigest'
import FeedDigest from './FeedDigest'
import SidebarDigest from './SidebarDigest'
import TitleDigest from './TitleDigest'

export const ArticleDigest = {
  Title: TitleDigest,
  Feed: FeedDigest,
  Card: CardDigest,
  Dropdown: DropdownDigest,

  /* TODO: legacy */
  Feature: FeatureDigest,
  Sidebar: SidebarDigest
}
