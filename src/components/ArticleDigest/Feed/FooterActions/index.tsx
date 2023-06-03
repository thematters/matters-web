import { TEST_ID } from '~/common/enums'
import {
  BookmarkButton,
  DateTime,
  IconArchive24,
  IconPaywall16,
  IconPin24,
} from '~/components'
import { FooterActionsArticlePublicFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../../DropdownActions'
import DonationCount from './DonationCount'
import { fragments } from './gql'
import ReadTime from './ReadTime'
import styles from './styles.module.css'

export type FooterActionsControls = DropdownActionsControls

export type FooterActionsProps = {
  article: FooterActionsArticlePublicFragment
  date?: Date | string | number | boolean
} & FooterActionsControls

const FooterActions = ({ article, date, ...controls }: FooterActionsProps) => {
  const hasDate = date !== false

  return (
    <footer className={styles.footer}>
      <section className={styles['left']}>
        <ReadTime article={article} />

        <DonationCount article={article} />

        {hasDate && <DateTime date={date || article.createdAt} />}

        {article.access.type === 'paywall' && <IconPaywall16 />}

        {controls.inUserArticles && article.sticky && (
          <IconPin24
            size="xs"
            data-test-id={TEST_ID.DIGEST_ARTICLE_FEED_FOOTER_PIN}
          />
        )}

        {controls.inUserArticles && article.articleState !== 'active' && (
          <>
            <IconArchive24 size="xs" />
          </>
        )}
      </section>

      <section className={styles['right']}>
        <BookmarkButton article={article} inCard={controls.inCard} />
        <DropdownActions article={article} {...controls} />
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
