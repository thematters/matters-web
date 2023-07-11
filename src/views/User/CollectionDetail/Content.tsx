import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import {
  Book,
  Button,
  DateTime,
  EmptyLayout,
  getErrorCodes,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import DropdownActions from '~/components/CollectionDigest/DropdownActions'
import EditCollection from '~/components/CollectionDigest/DropdownActions/EditCollection'
import { CollectionDetailQuery } from '~/gql/graphql'

import { COLLECTION_DETAIL } from './gql'
import styles from './styles.module.css'

const Content = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName
  const collectionId = getQuery('collectionId')

  /**
   * Data Fetching
   */
  const { data, loading, error } = usePublicQuery<CollectionDetailQuery>(
    COLLECTION_DETAIL,
    {
      variables: { id: collectionId },
      fetchPolicy: 'network-only',
    }
  )

  /**
   * Render
   */

  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  if (error) {
    const err = error
    const errorCodes = getErrorCodes(err)

    if (errorCodes[0] === ERROR_CODES.ENTITY_NOT_FOUND) {
      return (
        <EmptyLayout>
          <Throw404 />
        </EmptyLayout>
      )
    }

    return (
      <EmptyLayout>
        <QueryError error={err} />
      </EmptyLayout>
    )
  }

  if (data?.node?.__typename !== 'Collection') {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }
  const collection = data.node
  const { title, cover, description, updatedAt, articles } = collection

  return (
    <EditCollection.Dialog collection={collection}>
      {({ openDialog: openEditeCollection }) => (
        <section>
          <section className={styles.header}>
            {!!cover && (
              <Book
                title={title}
                cover={cover}
                articleCount={articles.totalCount}
              />
            )}
            {!cover && (
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
              {!description && (
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
          <section className={styles.midMenu}>
            <section className={styles.updatedDate}>
              <FormattedMessage
                defaultMessage="Updated {date}"
                description="src/views/User/CollectionDetail/Content.tsx"
                values={{
                  date: <DateTime date={updatedAt} color="grey" size="sm" />,
                }}
              />
            </section>

            <section>
              {isViewer && <DropdownActions collection={collection} />}
            </section>
          </section>
        </section>
      )}
    </EditCollection.Dialog>
  )
}

export default Content
