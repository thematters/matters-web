import classNames from 'classnames'
import Sticky from 'react-stickynode'

import { Head, Media, useRoute } from '~/components'
import { useChannels } from '~/components/Context'

import AuthHeader from './AuthHeader'
import FixedMain from './FixedMain'
import { GlobalNav } from './GlobalNav'
import Header from './Header'
import Notice from './Notice'
import SideChannelNav from './SideChannelNav'
import Spacing from './Spacing'
import styles from './styles.module.css'

const useLayoutType = () => {
  const { isInPath, isPathStartWith } = useRoute()
  const { isInWritingChallengeChannel } = useChannels()

  const isHome = isInPath('HOME')
  const isInMomentDetail = isInPath('MOMENT_DETAIL')
  const isInMomentDetailEdit = isInPath('MOMENT_DETAIL_EDIT')
  const isInCircleDetail =
    isInPath('CIRCLE_DETAIL') && isPathStartWith('/~', true)
  const isUserWorks = isInPath('USER_WORKS') && isPathStartWith('/@', true)

  const isOneColumnLayout =
    isInPath('SEARCH') ||
    isInPath('TAGS') ||
    // Circle
    isInCircleDetail ||
    isInPath('CIRCLE_DISCUSSION') ||
    isInPath('CIRCLE_BROADCAST') ||
    isInPath('CIRCLE_SETTINGS') ||
    isInPath('CIRCLE_SETTINGS_EDIT_PROFILE') ||
    isInPath('CIRCLE_SETTINGS_MANAGE_INVITATION') ||
    isInPath('CIRCLE_CREATION') ||
    isInPath('CIRCLE_ANALYTICS') ||
    // Misc
    isInPath('GUIDE') ||
    isInPath('COMMUNITY') ||
    isInPath('TOS') ||
    // Me
    isInPath('ME_DRAFTS') ||
    isInPath('ME_PUBLISHED') ||
    isInPath('ME_ARCHIVED') ||
    isInPath('ME_BOOKMARKS_ARTICLES') ||
    isInPath('ME_BOOKMARKS_TAGS') ||
    isInPath('ME_HISTORY') ||
    isInPath('ME_HISTORY_COMMENTS') ||
    isInPath('ME_HISTORY_LIKES_SENT') ||
    isInPath('ME_HISTORY_LIKES_RECEIVED') ||
    isInPath('ME_NOTIFICATIONS') ||
    isInPath('ME_WALLET') ||
    isInPath('ME_WALLET_TRANSACTIONS') ||
    isInPath('ME_ANALYTICS') ||
    isInPath('ME_SETTINGS') ||
    isInPath('ME_SETTINGS_NOTIFICATIONS') ||
    isInPath('ME_SETTINGS_NOTIFICATIONS_CIRCLE') ||
    isInPath('ME_SETTINGS_MISC') ||
    isInPath('ME_SETTINGS_BLOCKED') ||
    // Moment
    isInPath('MOMENT_DETAIL') ||
    isInPath('MOMENT_DETAIL_EDIT')

  const isTwoColumnLayout =
    // Tag
    isInPath('TAG_DETAIL') ||
    // User
    isUserWorks ||
    isInPath('USER_COLLECTIONS') ||
    isInPath('USER_COLLECTION_DETAIL') ||
    // Article
    isInPath('ARTICLE_DETAIL') ||
    isInPath('ARTICLE_DETAIL_EDIT') ||
    isInPath('ARTICLE_DETAIL_HISTORY') ||
    isInPath('ME_DRAFT_NEW') ||
    isInPath('ME_DRAFT_DETAIL') ||
    // Campaign
    (isInPath('CAMPAIGN_DETAIL') && !isInWritingChallengeChannel)

  const isThreeColumnLayout =
    isHome ||
    isInPath('FEATURED') ||
    isInPath('NEWEST') ||
    isInPath('CHANNEL') ||
    isInPath('FOLLOW') ||
    isInWritingChallengeChannel

  const isLeftLayout =
    isUserWorks ||
    isInPath('USER_COLLECTIONS') ||
    isInPath('USER_COLLECTION_DETAIL')

  return {
    isInMomentDetail,
    isInMomentDetailEdit,
    isOneColumnLayout,
    isTwoColumnLayout,
    isThreeColumnLayout,
    isLeftLayout,
  }
}

interface MainProps {
  aside?: React.ReactNode
  showAside?: boolean
  children?: React.ReactNode
}

const AsideSection = ({
  aside,
  asideClasses,
  enableSticky,
}: {
  aside: React.ReactNode
  asideClasses: string
  enableSticky: boolean
}) => (
  <aside className={asideClasses}>
    <Media greaterThanOrEqual="lg">
      <Sticky enabled={enableSticky} top={65} enableTransforms={false}>
        <section className={styles.content}>
          <section className={styles.top}>{aside}</section>
        </section>
      </Sticky>
    </Media>
  </aside>
)

const Main: React.FC<MainProps> & {
  Spacing: typeof Spacing
} = ({ aside, showAside = true, children }) => {
  const { isInPath } = useRoute()
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInArticleDetailHistory = isInPath('ARTICLE_DETAIL_HISTORY')

  const { isLeftLayout } = useLayoutType()

  const articleClasses = classNames({
    [styles.article]: true,
    [styles.hasNavBar]: !isInArticleDetail && !isInDraftDetail,
  })

  const asideClasses = classNames({
    [styles.aside]: true,
    [styles.leftLayout]: isLeftLayout,
  })

  const enableSticky = !isInArticleDetailHistory

  return (
    <>
      {showAside && isLeftLayout && (
        <AsideSection
          aside={aside}
          asideClasses={asideClasses}
          enableSticky={enableSticky}
        />
      )}

      <article className={articleClasses}>{children}</article>

      {showAside && !isLeftLayout && (
        <AsideSection
          aside={aside}
          asideClasses={asideClasses}
          enableSticky={enableSticky}
        />
      )}
    </>
  )
}

Main.Spacing = Spacing

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> & {
  Main: typeof Main
  Header: typeof Header
  FixedMain: typeof FixedMain
  AuthHeader: typeof AuthHeader
  Notice: typeof Notice
} = ({ children }) => {
  const {
    isInMomentDetail,
    isInMomentDetailEdit,
    isOneColumnLayout,
    isTwoColumnLayout,
    isThreeColumnLayout,
    isLeftLayout,
  } = useLayoutType()

  const layoutClasses = classNames({
    [styles.oneColumnLayout]: isOneColumnLayout,
    [styles.twoColumnLayout]: isTwoColumnLayout,
    [styles.threeColumnLayout]: isThreeColumnLayout,
    [styles.sideNavLayout]: isThreeColumnLayout,
  })

  const mainClasses = classNames({
    [styles.main]: true,
    [styles.leftLayout]: isLeftLayout,
  })

  return (
    <>
      <Head description={null} />
      {!isInMomentDetail && !isInMomentDetailEdit && <GlobalNav />}
      <div className={layoutClasses}>
        <main className={mainClasses}>
          {isThreeColumnLayout && (
            <nav role="navigation" className={styles.sidenav}>
              <section className={styles.sideNavContent}>
                <SideChannelNav />
              </section>
            </nav>
          )}

          {children}
        </main>
      </div>
    </>
  )
}

Layout.Main = Main
Layout.Header = Header
Layout.FixedMain = FixedMain
Layout.AuthHeader = AuthHeader
Layout.Notice = Notice
