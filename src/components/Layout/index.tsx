import classNames from 'classnames'
import Sticky from 'react-stickynode'

import { TEMPORARY_CHANNEL_URL } from '~/common/enums'
import { Head, Media, useRoute } from '~/components'

import AuthHeader from './AuthHeader'
import FixedMain from './FixedMain'
import Header from './Header'
// import NavBar from './NavBar'
import Notice from './Notice'
import SideChannelNav from './SideChannelNav'
// import SideFooter from './SideFooter'
import Spacing from './Spacing'
import styles from './styles.module.css'
import { TopNavBar } from './TopNavBar'
export const Layout: React.FC<{ children?: React.ReactNode }> & {
  Main: typeof Main
  Header: typeof Header
  FixedMain: typeof FixedMain
  AuthHeader: typeof AuthHeader
  Notice: typeof Notice
} = ({ children }) => {
  const { isInPath, isPathStartWith } = useRoute()
  const isHome = isInPath('HOME')
  // const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  // const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  // const isInArticleDetailHistory = isInPath('ARTICLE_DETAIL_HISTORY')
  const isInMomentDetail = isInPath('MOMENT_DETAIL')
  const isInMomentDetailEdit = isInPath('MOMENT_DETAIL_EDIT')
  const isInCircleDetail =
    isInPath('CIRCLE_DETAIL') && isPathStartWith('/~', true)
  const isUserWorks = isInPath('USER_WORKS') && isPathStartWith('/@', true)
  const isInTemporaryChannel = isPathStartWith(TEMPORARY_CHANNEL_URL, true)
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
    isInPath('CAMPAIGN_DETAIL')
  const isThreeColumnLayout =
    isHome || isInPath('CHANNEL') || isInPath('FOLLOW') || isInTemporaryChannel
  const isShowSideChannelNav =
    isHome || isInPath('CHANNEL') || isInPath('FOLLOW') || isInTemporaryChannel

  const layoutClasses = classNames({
    [styles.oneColumnLayout]: isOneColumnLayout,
    [styles.twoColumnLayout]: isTwoColumnLayout,
    [styles.threeColumnLayout]: isThreeColumnLayout,
    [styles.sideNavLayout]: isShowSideChannelNav,
  })

  return (
    <>
      <Head description={null} />
      {!isInMomentDetail && !isInMomentDetailEdit && <TopNavBar />}
      <div className={layoutClasses}>
        <main className={styles.main}>
          {isShowSideChannelNav && (
            <nav role="navigation" className={styles.sidenav}>
              <section className={styles.sideNavContent}>
                <SideChannelNav />
              </section>
            </nav>
          )}

          {children}
        </main>
      </div>

      {/* {!isInDraftDetail &&
        !isInArticleDetail &&
        !isInArticleDetailHistory &&
        !isInMomentDetail &&
        !isInMomentDetailEdit && (
          <Media lessThan="md">
            <footer>
              <NavBar />
            </footer>
          </Media>
        )} */}
    </>
  )
}

interface MainProps {
  aside?: React.ReactNode
  showAside?: boolean
}

const Main: React.FC<React.PropsWithChildren<MainProps>> & {
  Spacing: typeof Spacing
} = ({ aside, showAside = true, children }) => {
  const { isInPath } = useRoute()
  // const isInEditor =
  //   isInPath('ARTICLE_DETAIL_EDIT') || isInPath('ME_DRAFT_DETAIL')
  // const isInSettings = isInPath('SETTINGS')
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const isInArticleDetailHistory = isInPath('ARTICLE_DETAIL_HISTORY')

  const articleClasses = classNames({
    [styles.article]: true,
    [styles.hasNavBar]: !isInArticleDetail && !isInDraftDetail,
  })

  const enbableSticky = !isInArticleDetailHistory

  return (
    <>
      <article className={articleClasses}>{children}</article>

      {showAside && (
        <aside className={styles.aside}>
          <Media greaterThanOrEqual="lg">
            <Sticky enabled={enbableSticky} top={65} enableTransforms={false}>
              <section className={styles.content}>
                <section className={styles.top}>
                  {/* {!isInEditor && !isInArticleDetailHistory && <SearchBar />} */}

                  {aside}
                </section>

                {/* {!isInEditor && !isInSettings && !isInArticleDetailHistory && (
                  <SideFooter />
                )} */}
              </section>
            </Sticky>
          </Media>
        </aside>
      )}
    </>
  )
}

Main.Spacing = Spacing

Layout.Main = Main
Layout.Header = Header
Layout.FixedMain = FixedMain
Layout.AuthHeader = AuthHeader
Layout.Notice = Notice
