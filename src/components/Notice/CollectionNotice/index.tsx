import gql from 'graphql-tag'

import { CollectionNoticeFragment } from '~/gql/graphql'

import CollectionLikeNotice from './CollectionLikeNotice'

const CollectionNotice = ({ notice }: { notice: CollectionNoticeFragment }) => {
  switch (notice.__typename) {
    case 'CollectionNotice':
      return <CollectionLikeNotice notice={notice} />
    default:
      return null
  }
}

CollectionNotice.fragments = {
  notice: gql`
    fragment CollectionNotice on CollectionNotice {
      id
      unread
      __typename
      target {
        id
      }
    }
    ${CollectionLikeNotice.fragments.notice}
  `,
}

export default CollectionNotice
