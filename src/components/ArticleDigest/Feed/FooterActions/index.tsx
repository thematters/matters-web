import { useContext } from 'react'

import { ViewerContext } from '~/components'
import { FooterActionsArticlePublicFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../../DropdownActions'
import { fragments } from './gql'
import styles from './styles.module.css'

export type FooterActionsControls = DropdownActionsControls

export type FooterActionsProps = {
  article: FooterActionsArticlePublicFragment
  hasReadTime?: boolean
  hasDonationCount?: boolean
  hasCircle?: boolean
  tag?: React.ReactNode
} & FooterActionsControls

const FooterActions = ({
  article,
  hasReadTime,
  hasDonationCount,
  hasCircle,
  tag,
  ...controls
}: FooterActionsProps) => {
  const viewer = useContext(ViewerContext)

  return (
    <footer className={styles.footer}>
      <section className={styles.right}>
        {viewer.isAuthed && (
          <DropdownActions
            article={article}
            {...controls}
            size={22}
            inCard={true}
          />
        )}
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
