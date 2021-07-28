import {
  BookmarkButton,
  DateTime,
  IconArchive24,
  IconDotDivider,
  IconPaywall16,
  IconPin24,
} from '~/components'

import DropdownActions, { DropdownActionsControls } from '../../DropdownActions'
import { fragments } from './gql'
import ReadTime from './ReadTime'
import styles from './styles.css'

import { FooterActionsArticlePublic } from './__generated__/FooterActionsArticlePublic'

export type FooterActionsControls = DropdownActionsControls

export type FooterActionsProps = {
  article: FooterActionsArticlePublic
  date?: Date | string | number | boolean
} & FooterActionsControls

const FooterActions = ({ article, date, ...controls }: FooterActionsProps) => {
  const hasDate = date !== false

  return (
    <footer>
      <section className="left">
        <ReadTime article={article} hasDate={hasDate} />

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
            <IconPin24 />
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
