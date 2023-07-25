import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Book,
  Button,
  Expandable,
  Media,
  useRoute,
  ViewerContext,
} from '~/components'
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
          <Media at="sm">
            <section>
              <section className={styles.header}>
                {(!!cover || !isViewer) && <Book title={title} cover={cover} />}
                {!cover && isViewer && (
                  <button onClick={openEditeCollection}>
                    <Book title={title} hasMask />
                  </button>
                )}
                <section className={styles.info}>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.author}>{collection.author.userName}</p>
                  <p className={styles.articleCount}>
                    <FormattedMessage
                      defaultMessage="{articleCount} Articles"
                      description="src/views/User/CollectionDetail/CollectionProfile/index.tsx"
                      values={{
                        articleCount: articles.totalCount,
                      }}
                    />
                  </p>
                </section>
              </section>
              <section className={styles.description}>
                {!!description && (
                  <Expandable
                    content={description}
                    limit={4}
                    size="sm"
                    color="greyDark"
                    collapseable={false}
                  >
                    <p>{description}</p>
                  </Expandable>
                )}
                {!description && isViewer && (
                  <p className={styles.addDescription}>
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
          </Media>
          <Media greaterThan="sm">
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
                  <p className={styles.addDescription}>
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
          </Media>
        </section>
      )}
    </EditCollection.Dialog>
  )
}

export default CollectionProfile
