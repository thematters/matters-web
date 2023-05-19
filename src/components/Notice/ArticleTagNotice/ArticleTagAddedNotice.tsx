import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleTagAddedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeTag from '../NoticeTag'

const ArticleTagAddedNotice = ({
  notice,
}: {
  notice: ArticleTagAddedNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="selected your work {articleTitle} to {tag} featured"
          description="src/components/Notice/ArticleTagNotice/ArticleTagAddedNotice.tsx"
          values={{
            articleTitle: <NoticeArticleTitle article={notice.target} />,
            tag: <NoticeTag tag={notice.tag} />,
          }}
        />
      }
      testId={TEST_ID.NOTICE_ARTICLE_TAG_ADDED}
    />
  )
}

ArticleTagAddedNotice.fragments = {
  notice: gql`
    fragment ArticleTagAddedNotice on ArticleTagNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        author {
          displayName
        }
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

export default ArticleTagAddedNotice
