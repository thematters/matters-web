import gql from 'graphql-tag'

import EditCollection from '~/components/CollectionDigest/DropdownActions/EditCollection'

import LikeButton from './LikeButton'

export const fragments = {
  collection: {
    public: gql`
      fragment CollectionProfileCollectionPublic on Collection {
        id
        author {
          id
          userName
          displayName
        }
        ...EditCollectionCollection
        ...CollectionLikeButtonPublic
      }
      ${EditCollection.fragments.collection}
      ${LikeButton.fragments.collection.public}
    `,
    private: gql`
      fragment CollectionProfileCollectionPrivate on Collection {
        id
        ...CollectionLikeButtonPrivate
      }
      ${LikeButton.fragments.collection.private}
    `,
  },
}
