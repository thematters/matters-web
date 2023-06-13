import { CircleDigest } from '~/components'
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
  hasReadTime?: boolean
  hasDonationCount?: boolean
  hasCircle?: boolean
} & FooterActionsControls

const FooterActions = ({
  article,
  date,
  hasReadTime,
  hasDonationCount,
  hasCircle,
  ...controls
}: FooterActionsProps) => {
  const {
    access: { circle },
  } = article
  return (
    <footer className={styles.footer}>
      <section className={styles.left}>
        {hasReadTime && <ReadTime article={article} />}

        {hasDonationCount && <DonationCount article={article} />}

        {hasCircle && circle && (
          <CircleDigest.Title
            circle={circle}
            is="span"
            textSize="xs"
            textWeight="normal"
          />
        )}
      </section>

      <section className={styles.right}>
        <DropdownActions article={article} {...controls} size="mdM" />
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
