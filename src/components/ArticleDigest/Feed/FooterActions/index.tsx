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
import styles from './styles.css'

import { FooterActionsArticlePublic } from './__generated__/FooterActionsArticlePublic'

export type FooterActionsControls = DropdownActionsControls

type FooterActionsProps = {
  article: FooterActionsArticlePublic
} & FooterActionsControls

const FooterActions = ({ article, ...controls }: FooterActionsProps) => {
  return (
    <footer>
      <section className="left">
        <DateTime date={article.createdAt} />

        {article.sticky && (
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
