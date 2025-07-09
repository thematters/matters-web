import { useContext } from 'react'

import DropdownActions from '~/components/ArticleDigest/DropdownActions'
import type { FooterActionsControls } from '~/components/ArticleDigest/Feed/FooterActions'
import { ViewerContext } from '~/components/Context'
import { CuratedFooterActionsArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'
const isAdminView = process.env.NEXT_PUBLIC_ADMIN_VIEW === 'true'

export type FooterActionsProps = {
  article: CuratedFooterActionsArticleFragment
} & FooterActionsControls

export const FooterActions = ({ article, ...controls }: FooterActionsProps) => {
  const viewer = useContext(ViewerContext)

  if (!isAdminView || !viewer.isAdmin) {
    return null
  }

  return (
    <section className={styles.wrapper}>
      <DropdownActions
        article={article}
        {...controls}
        size={22}
        inCard={true}
      />
    </section>
  )
}

FooterActions.fragments = fragments

export default FooterActions
