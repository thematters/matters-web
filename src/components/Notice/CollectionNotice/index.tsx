import gql from 'graphql-tag'

import { CollectionNoticeFragment } from '~/gql/graphql'

import CollectionNewLikeNotice from './CollectionLikeNotice'

const CollectionNotice = ({ notice }: { notice: CollectionNoticeFragment }) => {
  return <CollectionNewLikeNotice notice={notice} />
}

CollectionNotice.fragments = {
  notice: gql`
    fragment CollectionNotice on CollectionNotice {
      id
      unread
      __typename
      ...CollectionNewLikeNotice
    }
    ${CollectionNewLikeNotice.fragments.notice}
  `,
}

export default CollectionNotice
