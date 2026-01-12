import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import IconBook from '@/public/static/icons/24px/book2.svg'
import { toPath } from '~/common/utils'
import { Card, Icon } from '~/components'
import { CollectionNoticeFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const CollectionCard = ({
  notice,
}: {
  notice: CollectionNoticeFragment | null
}) => {
  const userName = notice?.collection?.author.userName

  if (!notice || !userName) {
    return null
  }

  const containerClasses = classNames({
    [styles.container]: true,
  })

  const path = toPath({
    page: 'collectionDetail',
    collection: notice.collection,
    userName,
  })

  return (
    <Card {...path} spacing={[0, 0]} bgColor="none">
      <section className={containerClasses}>
        <Icon icon={IconBook} size={16} />
        <Link {...path} className="u-link-active-green">
          <h3 className={styles.title}>{notice.collection.title}</h3>
        </Link>
      </section>
    </Card>
  )
}

CollectionCard.fragments = {
  collection: gql`
    fragment CollectionCardCollection on Collection {
      id
      title
      author {
        id
        userName
      }
    }
  `,
}

export default CollectionCard
