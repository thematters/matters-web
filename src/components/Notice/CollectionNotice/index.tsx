import gql from 'graphql-tag'

import { CollectionNoticeFragment } from '~/gql/graphql'

import CollectionNewLikeNotice from './CollectionLikeNotice'

const CollectionNotice = ({ notice }: { notice: CollectionNoticeFragment }) => {
  switch (notice.__typename) {
    case 'CollectionNotice':
      return <CollectionNewLikeNotice notice={notice} /> // so far just one type of notice
    default:
      return null
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
      }
      ...CollectionNewLikeNotice
    }
    ${CollectionNewLikeNotice.fragments.notice}
  `,
}

export default CollectionNotice
