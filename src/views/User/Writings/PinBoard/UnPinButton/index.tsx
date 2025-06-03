import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconUnpin from '@/public/static/icons/24px/unpin.svg'
import { TEST_ID, Z_INDEX } from '~/common/enums'
import { Icon, Tooltip, useMutation, ViewerContext } from '~/components'
import { UnpinArticleMutation, UnpinCollectionMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const UNPIN_ARTICLE = gql`
  mutation UnpinArticle($id: ID!) {
    editArticle(input: { id: $id, pinned: false }) {
      id
      pinned
    }
  }
`

const UNPIN_COLLECTION = gql`
  mutation UnpinCollection($id: ID!) {
    putCollection(input: { id: $id, pinned: false }) {
      id
      pinned
    }
  }
`

const UnPinButton = ({
  id,
  userName,
  type,
}: {
  id: string
  userName: string
  type: 'article' | 'collection'
}) => {
  const viewer = useContext(ViewerContext)
  const isArticle = type === 'article'
  const [unpin] = useMutation<UnpinArticleMutation | UnpinCollectionMutation>(
    isArticle ? UNPIN_ARTICLE : UNPIN_COLLECTION,
    {
      variables: { id },
      optimisticResponse: isArticle
        ? {
            editArticle: {
              id,
              pinned: false,
              __typename: 'Article',
            },
          }
        : {
            putCollection: {
              id,
              pinned: false,
              __typename: 'Collection',
            },
          },
      update: (cache) => {
        cache.modify({
          id: cache.identify(viewer),
          fields: {
            pinnedWorks(existingPinnedWorks, { readField }) {
              return existingPinnedWorks.filter(
                (work: { id: string }) => readField('id', work) !== id
              )
            },
          },
        })
      },
    }
  )

  if (viewer.userName !== userName) {
    return null
  }

  return (
    <Tooltip
      placement="top"
      content={
        <FormattedMessage
          defaultMessage="Unpin from profile"
          id="84VOdX"
          description="src/views/User/Articles/PinBoard/UnPinButton/index.tsx"
        />
      }
      zIndex={Z_INDEX.OVER_STICKY_TABS}
      delay={[1000, null]}
    >
      <button
        type="button"
        onClick={() => unpin()}
        className={styles.unpin}
        data-test-id={TEST_ID.USER_PROFILE_PIN_BOARD_UNPIN_BUTTON}
      >
        <Icon icon={IconUnpin} size={20} color="white" />
      </button>
    </Tooltip>
  )
}

export default UnPinButton
