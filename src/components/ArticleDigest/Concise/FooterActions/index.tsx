import { BookmarkButton, DateTime } from '~/components'
import { FooterActionsConciseArticlePublicFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

export type FooterActionsProps = {
  article: FooterActionsConciseArticlePublicFragment
  date?: Date | string | number | boolean
  inCard?: boolean
  tag?: React.ReactNode
  circle?: React.ReactNode
}

const FooterActions = ({
  article,
  date,
  inCard,
  tag,
  circle,
}: FooterActionsProps) => {
  const hasDate = date !== false

  return (
    <footer className={styles.footer}>
      <section className={styles.left}>
        {tag}
        {circle}
        {hasDate && <DateTime date={date || article.createdAt} />}
      </section>

      <section className={styles.right}>
        <BookmarkButton article={article} inCard={inCard} />
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
