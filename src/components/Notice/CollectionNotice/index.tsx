import gql from 'graphql-tag'

import { CollectionNoticeFragment } from '~/gql/graphql'

import CollectionNewLike from './CollectionLike'

const CollectionNotice = ({ notice }: { notice: CollectionNoticeFragment }) => {
  return <CollectionNewLike notice={notice} />
}

CollectionNotice.fragments = {
  notice: gql`
    fragment CollectionNotice on CollectionNotice {
      id
      unread
      __typename
      ...CollectionNewLike
    }
    ${CollectionNewLike.fragments.notice}
  `,
}

export default CollectionNotice
