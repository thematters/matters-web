import gql from 'graphql-tag'

import { CollectionNoticeFragment } from '~/gql/graphql'

import CollectionNewLikeNotice from './CollectionLikeNotice'

const CollectionNotice = ({ notice }: { notice: CollectionNoticeFragment }) => {
  switch (notice.type) {
    default:
      return <CollectionNewLikeNotice notice={notice} /> // so far just one type of notice
  }
}

CollectionNotice.fragments = {
  notice: gql`
    fragment CollectionNotice on CollectionNotice {
      id
      unread
      type: __typename
      target {
        id
        title
        author {
          userName
        }
      }
      ...CollectionNewLikeNotice
    }
    ${CollectionNewLikeNotice.fragments.notice}
  `,
}

export default CollectionNotice
