import gql from 'graphql-tag'

import InCircleNewArticleNotice from './InCircleNewArticleNotice'

import { CircleArticleNotice as NoticeType } from './__generated__/CircleArticleNotice'

const CircleArticleNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.circleArticleNoticeType) {
    case 'InCircleNewArticle':
      return <InCircleNewArticleNotice notice={notice} />
    default:
      return null
  }
}

CircleArticleNotice.fragments = {
  notice: gql`
    fragment CircleArticleNotice on CircleArticleNotice {
      id
      unread
      __typename
      circleArticleNoticeType: type
      ...InCircleNewArticleNotice
    }
    ${InCircleNewArticleNotice.fragments.notice}
  `,
}

export default CircleArticleNotice
