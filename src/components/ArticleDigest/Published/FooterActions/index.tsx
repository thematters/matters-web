import { FooterActionsPublishedArticlePublicFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../../DropdownActions'
import { fragments } from './gql'
import styles from './styles.module.css'

export type FooterActionsControls = DropdownActionsControls

export type FooterActionsProps = {
  article: FooterActionsPublishedArticlePublicFragment
} & FooterActionsControls

const FooterActions = ({ article, ...controls }: FooterActionsProps) => {
  const {} = article
  console.log({ article })

  return (
    <footer className={styles.footer}>
      <section className={styles.left}></section>

      <section className={styles.right}>
        <DropdownActions
          article={article}
          {...controls}
          size="mdM"
          inCard={true}
        />
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
