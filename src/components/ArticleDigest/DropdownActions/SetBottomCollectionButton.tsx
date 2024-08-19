import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconArrowLDown } from '@/public/static/icons/24px/arrow-l-down.svg'
import { Icon, Menu, useMutation } from '~/components'
import { updateUserCollectionDetail } from '~/components/GQL'
import { SetBottomCollectionMutation } from '~/gql/graphql'

const SET_BOTTOM_COLLECTION = gql`
  mutation SetBottomCollection(
    $collectionId: ID!
    $articleId: ID!
    $newPosition: Int!
  ) {
    reorderCollectionArticles(
      input: {
        collection: $collectionId
        moves: { item: $articleId, newPosition: $newPosition }
      }
    ) {
      id
    }
  }
`

const SetBottomCollectionButton = ({
  collectionId,
  articleId,
  collectionArticleCount,
  onClick,
}: {
  articleId: string
  collectionId: string
  collectionArticleCount: number
  onClick: () => void
}) => {
  const [update] = useMutation<SetBottomCollectionMutation>(
    SET_BOTTOM_COLLECTION,
    {
      variables: {
        collectionId,
        articleId,
        newPosition: collectionArticleCount - 1,
      },
    }
  )

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Move to bottom"
          id="Udp4Bm"
          description="src/components/ArticleDigest/DropdownActions/SetBottomCollectionButton.tsx"
        />
      }
      icon={<Icon icon={IconArrowLDown} size={20} />}
      onClick={async () => {
        onClick()
        await update({
          update(cache) {
            updateUserCollectionDetail({
              cache,
              collectionId,
              articleId,
              type: 'setBottom',
            })
          },
        })
      }}
    />
  )
}

export default SetBottomCollectionButton
