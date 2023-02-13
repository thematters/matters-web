import { TEST_ID } from '@/src/common/enums'
import {
  BookmarkButton,
  DateTime,
  IconArchive24,
  IconDotDivider,
  IconPaywall16,
  IconPin24,
} from '~/components'
import { FooterActionsArticlePublicFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../../DropdownActions'
import DonationCount from './DonationCount'
import { fragments } from './gql'
import ReadTime from './ReadTime'
import styles from './styles.css'

export type FooterActionsControls = DropdownActionsControls

export type FooterActionsProps = {
  article: FooterActionsArticlePublicFragment
  date?: Date | string | number | boolean
} & FooterActionsControls

const FooterActions = ({ article, date, ...controls }: FooterActionsProps) => {
  const hasDate = date !== false
  const hasDonation = article.transactionsReceivedBy.totalCount > 0

  return (
    <footer>
      <section className="left">
        <ReadTime article={article} hasDivider={hasDate || hasDonation} />

        <DonationCount article={article} hasDivider={hasDate} />

        {hasDate && <DateTime date={date || article.createdAt} />}

        {article.access.type === 'paywall' && (
          <>
            <IconDotDivider />
            <IconPaywall16 />
          </>
        )}

        {controls.inUserArticles && article.sticky && (
          <>
            <IconDotDivider />
            <IconPin24 data-test-id={TEST_ID.DIGEST_ARTICLE_FEED_FOOTER_PIN} />
          </>
        )}

        {controls.inUserArticles && article.articleState !== 'active' && (
          <>
            <IconDotDivider />
            <IconArchive24 />
          </>
        )}
      </section>

      <section className="right">
        <BookmarkButton article={article} inCard={controls.inCard} />
        <DropdownActions article={article} {...controls} />
      </section>

      <style jsx>{styles}</style>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
