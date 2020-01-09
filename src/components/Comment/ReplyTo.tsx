import { Translate } from '~/components/Language'
import { UserDigest } from '~/components/UserDigest'

import { TEXT } from '~/common/enums'

import { DescendantsIncludedComment_comments_edges_node_replyTo_author } from './__generated__/DescendantsIncludedComment'
import styles from './styles.css'

const ReplyTo = ({
  user,
  inArticle
}: {
  user: DescendantsIncludedComment_comments_edges_node_replyTo_author
  inArticle: boolean
}) => (
  <section className="reply-to">
    <span className="wording">
      <Translate zh_hant={TEXT.zh_hant.reply} zh_hans={TEXT.zh_hans.reply} />
    </span>

    <UserDigest.Mini
      user={user}
      avatarSize="xs"
      textWeight="md"
      spacing="xxtight"
      hasUserName={inArticle}
    />

    <style jsx>{styles}</style>
  </section>
)

export default ReplyTo
