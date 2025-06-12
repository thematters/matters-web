import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Book,
  Button,
  Expandable,
  Media,
  toast,
  useRoute,
  ViewerContext,
} from '~/components'
import EditCollection from '~/components/CollectionDigest/DropdownActions/EditCollection'
import { CollectionProfileCollectionPublicFragment } from '~/gql/graphql'

import { fragments } from './gql'
import LikeButton from './LikeButton'
import styles from './styles.module.css'

interface CollectionProfileProps {
  collection: CollectionProfileCollectionPublicFragment
}

const CollectionProfile = ({ collection }: CollectionProfileProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName
  const { title, cover, description, author } = collection
  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  let onClick: () => void | undefined

  if (!viewer.isAuthed) {
    onClick = () => {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.collectionLike },
        })
      )
    }
  } else if (viewer.isArchived || viewer.isFrozen) {
    onClick = forbid
  }

  return (
    <EditCollection.Dialog collection={collection}>
      {({ openDialog: openEditCollection }) => (
        <section>
          <Media lessThan="lg">
            <section>
              <section className={styles.header}>
                {(!!cover || !isViewer) && (
                  <Book.Collection title={title} cover={cover} />
                )}
                {!cover && isViewer && (
                  <button onClick={openEditCollection}>
                    <Book.Collection title={title} hasMask />
                  </button>
                )}
                <section className={styles.info}>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.author}>
                    <Link
                      {...toPath({
                        page: 'userProfile',
                        userName: author.userName || '',
                      })}
                    >
                      {author.displayName}
                    </Link>
                  </p>
                  <div className={styles.like}>
                    <LikeButton collection={collection} onClick={onClick} />
                  </div>
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
                      onClick={openEditCollection}
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
                <button onClick={openEditCollection}>
                  <Book.Collection title={title} hasMask />
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
                      onClick={openEditCollection}
                    >
                      <FormattedMessage
                        defaultMessage="Add description"
                        id="JTWayV"
                        description="src/views/User/CollectionDetail/Content.tsx"
                      />
                    </Button>
                  </p>
                )}
                <div className={styles.like}>
                  <LikeButton collection={collection} onClick={onClick} />
                </div>
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
