import { MAX_META_SUMMARY_LENGTH, TEST_ID } from '~/common/enums'
import { analytics, makeSummary, toLocale, toPath } from '~/common/utils'
import { ButtonProps, ShareButton } from '~/components'
import DropdownActions, {
  DropdownActionsControls,
} from '~/components/ArticleDigest/DropdownActions'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import AppreciationButton from '../../AppreciationButton'
import CommentButton from '../Button/CommentButton'
import styles from './styles.module.css'

export type DesktopToolbarProps = {
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  translatedLanguage?: string | null
  privateFetched: boolean
  lock: boolean
  toggleDrawer: () => void
} & DropdownActionsControls

const DesktopToolbar = ({
  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  lock,
  toggleDrawer,
  ...props
}: DesktopToolbarProps) => {
  const path = toPath({ page: 'articleDetail', article: articleDetails })
  const sharePath =
    translated && translatedLanguage
      ? `${path.href}?locale=${toLocale(translatedLanguage)}`
      : path.href

  const dropdonwActionsProps: DropdownActionsControls = {
    inCard: true,
    hasEdit: true,
    hasIPFS: true,
    hasBookmark: true,
    hasArchive: true,
    hasAddCollection: true,
    hasExtend: false,
    color: 'black',
    ...props,
  }

  const buttonProps: ButtonProps = {
    spacing: [8, 12],
    borderWidth: 'sm',
    borderColor: 'greyLighterActive',
    borderActiveColor: 'greyLight',
    borderRadius: '0.75rem',
  }

  return (
    <section className={styles.toolbar} data-test-id={TEST_ID.ARTICLE_TOOLBAR}>
      <section className={styles.buttons}>
        <section className={styles.left}>
          <AppreciationButton
            article={articleDetails}
            privateFetched={privateFetched}
            iconSize={24}
            disabled={lock}
            clickEvent={() => {
              analytics.trackEvent('click_button', {
                type: 'appreciate',
                pageType: 'article_detail',
                pageComponent: 'article_end_toolbar',
              })
            }}
            {...buttonProps}
          />
          <section className={styles.commentBar}>
            <CommentButton
              article={articleDetails}
              disabled={!articleDetails.canComment}
              iconSize={24}
              onClick={toggleDrawer}
              {...buttonProps}
            />
          </section>
        </section>

        <section className={styles.right}>
          <span>
            <ShareButton
              title={`${makeSummary(articleDetails.title, MAX_META_SUMMARY_LENGTH)} - ${articleDetails?.author.displayName} - Matters`}
              path={sharePath}
              iconSize={24}
              inCard={false}
              textActiveColor="greyDarker"
              disabled={lock}
              spacing={[10, 10]}
              clickEvent={() => {
                analytics.trackEvent('click_button', {
                  type: 'share_article_open',
                  pageType: 'article_detail',
                  pageComponent: 'article_end_toolbar',
                })
              }}
            />
          </span>

          <span>
            <DropdownActions
              article={articleDetails}
              disabled={lock}
              size={24}
              pageType="article_detail"
              pageComponent="article_end_toolbar"
              {...dropdonwActionsProps}
            />
          </span>
        </section>
      </section>
    </section>
  )
}

export default DesktopToolbar
