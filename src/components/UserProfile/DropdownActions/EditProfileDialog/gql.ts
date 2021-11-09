import gql from 'graphql-tag'

export const fragments = {
  user: {
    public: gql`
      fragment EditProfileDialogUserPublic on User {
        id
        avatar
        displayName
        info {
          profileCover
          description
          badges {
            type
          }
        }
        liker {
          civicLiker
        }
      }
    `,
    private: gql`
      fragment EditProfileDialogUserPrivate on User {
        id
        avatar
        displayName
        info {
          profileCover
          description
          badges {
            type
          }
          cryptoWallet {
            id
            address
            nfts {
              id
              name
              description
              imageUrl
              imagePreviewUrl
              imageOriginalUrl
              contractAddress
              collectionName
              tokenMetadata
            }
          }
        }
        liker {
          civicLiker
        }
      }
    `,
  },
}
