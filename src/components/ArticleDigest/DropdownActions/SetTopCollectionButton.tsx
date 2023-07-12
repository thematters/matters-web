import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { IconArrowTop20, Menu, useMutation } from '~/components'
import updateUserCollectionDetail from '~/components/GQL/updates/userCollectionDetail'
import { SetTopCollectionMutation } from '~/gql/graphql'

const SET_TOP_COLLECTION = gql`
  mutation SetTopCollection($collectionId: ID!, $articleId: ID!) {
    reorderCollectionArticles(
      input: {
        collection: $collectionId
        moves: { item: $articleId, newPosition: 0 }
      }
    ) {
      id
    }
  }
`

const SetTopCollectionButton = ({
  collectionId,
  articleId,
}: {
  articleId: string
  collectionId: string
}) => {
  const [update] = useMutation<SetTopCollectionMutation>(SET_TOP_COLLECTION, {
    variables: { collectionId, articleId },
  })

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Move to top"
          description="src/components/ArticleDigest/DropdownActions/SetTopCollectionButton.tsx"
        />
      }
      icon={<IconArrowTop20 size="mdS" />}
      onClick={async () => {
        await update({
          update(cache) {
            updateUserCollectionDetail({
              cache,
              collectionId,
              articleId,
              type: 'setTop',
            })
          },
        })
      }}
    />
  )
}

export default SetTopCollectionButton
