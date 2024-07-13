import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Book,
  Button,
  Expandable,
  LinkWrapper,
  Media,
  useRoute,
  ViewerContext,
} from '~/components'
import EditCollection from '~/components/CollectionDigest/DropdownActions/EditCollection'
import { CollectionProfileCollectionFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

interface CollectionProfileProps {
  collection: CollectionProfileCollectionFragment
}

const CollectionProfile = ({ collection }: CollectionProfileProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  const { title, cover, description, articles, author } = collection

  return (
    <EditCollection.Dialog collection={collection}>
      {({ openDialog: openEditeCollection }) => (
        <section>
          <Media lessThan="lg">
            <section>
              <section className={styles.header}>
                {(!!cover || !isViewer) && (
                  <Book.Collection title={title} cover={cover} />
                )}
                {!cover && isViewer && (
                  <button onClick={openEditeCollection}>
                    <Book.Collection title={title} hasMask />
                  </button>
                )}
                <section className={styles.info}>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.author}>
                    <LinkWrapper
                      {...toPath({
                        page: 'userProfile',
                        userName: author.userName || '',
                      })}
                    >
                      {author.displayName}
                    </LinkWrapper>
                  </p>
                  <p className={styles.articleCount}>
                    <FormattedMessage
                      defaultMessage="{articleCount} Articles"
                      id="LQxY1o"
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
                    size={14}
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
                        id="JTWayV"
                        description="src/views/User/CollectionDetail/Content.tsx"
                      />
                    </Button>
                  </p>
                )}
              </section>
            </section>
          </Media>

          <Media greaterThanOrEqual="lg">
            <section className={styles.header}>
              {(!!cover || !isViewer) && (
                <Book.Collection title={title} cover={cover} />
              )}
              {!cover && isViewer && (
                <button onClick={openEditeCollection}>
                  <Book.Collection title={title} hasMask />
                </button>
              )}
              <section className={styles.info}>
                <h2 className={styles.title}>{title}</h2>
                {!!description && (
                  <p className={styles.description}>{description}</p>
                )}
                <p>❤️</p>
                {!description && isViewer && (
                  <p className={styles.addDescription}>
                    <Button
                      textColor="greyDarker"
                      textActiveColor="green"
                      onClick={openEditeCollection}
                    >
                      <FormattedMessage
                        defaultMessage="Add description"
                        id="JTWayV"
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

CollectionProfile.fragments = fragments

export default CollectionProfile
