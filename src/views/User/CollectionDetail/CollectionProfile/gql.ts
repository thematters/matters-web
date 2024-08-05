import gql from 'graphql-tag'

import EditCollection from '~/components/CollectionDigest/DropdownActions/EditCollection'

import LikeButton from './LikeButton'

export const fragments = {
  collection: gql`
    fragment CollectionProfileCollection on Collection {
      id
      author {
        id
        userName
        displayName
      }
      ...EditCollectionCollection
      ...CollectionLikeButtonPublic
      ...CollectionLikeButtonPrivate
    }
    ${EditCollection.fragments.collection}
    ${LikeButton.fragments.collection.public}
    ${LikeButton.fragments.collection.private}
  `,
}
