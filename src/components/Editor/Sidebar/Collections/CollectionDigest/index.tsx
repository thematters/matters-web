import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import IconDraft from '@/public/static/icons/24px/draft.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import { Icon, TextIcon } from '~/components'
import { CollectionDigestCollectionPublicFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  collection: gql`
    fragment CollectionDigestCollectionPublic on Collection {
      id
      title
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

type CollectionDigestProps = {
  collection: CollectionDigestCollectionPublicFragment
  saving?: boolean
}

export const CollectionDigest = ({
  collection,
  saving,
}: CollectionDigestProps) => {
  const intl = useIntl()

  return (
    <section className={styles.container}>
      <section className={styles.left}>
        <TextIcon
          icon={<Icon icon={IconDraft} color="greyDark" />}
          textLineClamp
          size={14}
          spacing={4}
        >
          {collection.title}
        </TextIcon>
      </section>
      <section className={styles.right}>
        <button
          type="button"
          onClick={() => {}}
          aria-label={intl.formatMessage({
            defaultMessage: 'Remove',
            id: 'G/yZLu',
          })}
          disabled={saving}
        >
          <Icon icon={IconTimes} color="black" size={12} />
        </button>
      </section>
    </section>
  )
}

CollectionDigest.fragments = fragments
