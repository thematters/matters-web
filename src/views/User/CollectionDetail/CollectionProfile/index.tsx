import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { Book, Button, useRoute, ViewerContext } from '~/components'
import EditCollection from '~/components/CollectionDigest/DropdownActions/EditCollection'
import { CollectionDetailFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface CollectionProfileProps {
  collection: CollectionDetailFragment
}

const CollectionProfile = ({ collection }: CollectionProfileProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  const { title, cover, description, articles } = collection

  return (
    <EditCollection.Dialog collection={collection}>
      {({ openDialog: openEditeCollection }) => (
        <section>
          <section className={styles.header}>
            {(!!cover || !isViewer) && (
              <Book
                title={title}
                cover={cover}
                articleCount={articles.totalCount}
              />
            )}
            {!cover && isViewer && (
              <button onClick={openEditeCollection}>
                <Book
                  title={title}
                  articleCount={articles.totalCount}
                  hasMask
                />
              </button>
            )}
            <section className={styles.info}>
              <h2 className={styles.title}>{title}</h2>
              {!!description && (
                <p className={styles.description}>{description}</p>
              )}
              {!description && isViewer && (
                <p>
                  <Button
                    textColor="greyDarker"
                    textActiveColor="green"
                    onClick={openEditeCollection}
                  >
                    <FormattedMessage
                      defaultMessage="Add description"
                      description="src/views/User/CollectionDetail/Content.tsx"
                    />
                  </Button>
                </p>
              )}
            </section>
          </section>
        </section>
      )}
    </EditCollection.Dialog>
  )
}

export default CollectionProfile
