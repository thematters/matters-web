import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleTagRemovedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeTag from '../NoticeTag'

const ArticleTagRemovedNotice = ({
  notice,
}: {
  notice: ArticleTagRemovedNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="remove your work {articleTitle} from {tag}"
          description="src/components/Notice/ArticleTagNotice/ArticleTagRemovedNotice.tsx"
          values={{
            articleTitle: <NoticeArticleTitle article={notice.target} />,
            tag: <NoticeTag tag={notice.tag} />,
          }}
        />
      }
      testId={TEST_ID.ARTICLE_TAG_REMOVED}
    />
  )
}

ArticleTagRemovedNotice.fragments = {
  notice: gql`
    fragment ArticleTagRemovedNotice on ArticleTagNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeArticleTitle
      }
      tag {
        ...NoticeTag
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeDate.fragments.notice}
    ${NoticeTag.fragments.tag}
  `,
}

export default ArticleTagRemovedNotice
