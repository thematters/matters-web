import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconArrowLTop } from '@/public/static/icons/24px/arrow-l-top.svg'
import { Icon, Menu, useMutation } from '~/components'
import { updateUserCollectionDetail } from '~/components/GQL'
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
    update(cache) {
      updateUserCollectionDetail({
        cache,
        collectionId,
        articleId,
        type: 'setTop',
      })
    },
  })

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Move to top"
          id="+S8mxW"
          description="src/components/ArticleDigest/DropdownActions/SetTopCollectionButton.tsx"
        />
      }
      icon={<Icon icon={IconArrowLTop} size={20} />}
      onClick={update}
    />
  )
}

export default SetTopCollectionButton
