import {
  MomentDigestFooterActionsMomentPrivateFragment,
  MomentDigestFooterActionsMomentPublicFragment,
} from '~/gql/graphql'

import DropdownActions from '../DropdownActions'
import CommentedFollowees from './CommentedFollowees'
import { fragments } from './gql'
import LikeButton from './LikeButton'
import ReplyButton from './ReplyButton'
import styles from './styles.module.css'

export type FooterActionsProps = {
  moment: MomentDigestFooterActionsMomentPublicFragment &
    Partial<MomentDigestFooterActionsMomentPrivateFragment>
  hasCommentedFollowees?: boolean
}

const FooterActions = ({
  moment,
  hasCommentedFollowees,
}: FooterActionsProps) => {
  return (
    <footer className={styles.footer}>
      <section className={styles.left}>
        <LikeButton moment={moment} />
        <ReplyButton moment={moment} />
        {hasCommentedFollowees && <CommentedFollowees moment={moment} />}
      </section>
      <section>
        <DropdownActions moment={moment} />
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
