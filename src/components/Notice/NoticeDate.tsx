import gql from 'graphql-tag'

import { DateTime } from '~/components'
import { NoticeDateFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const NoticeDate = ({ notice }: { notice: NoticeDateFragment }) => (
  <section className={styles.date}>
    <DateTime date={notice.createdAt} size="xs" color="grey" minimal={true} />
  </section>
)

NoticeDate.fragments = {
  notice: gql`
    fragment NoticeDate on Notice {
      id
      createdAt
    }
  `,
}

export default NoticeDate
