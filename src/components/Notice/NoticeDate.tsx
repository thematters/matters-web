import gql from 'graphql-tag'

import { DateTime } from '~/components'

import styles from './styles.css'

import { NoticeDate as NoticeDateType } from './__generated__/NoticeDate'

const NoticeDate = ({ notice }: { notice: NoticeDateType }) => (
  <section className="date">
    <DateTime date={notice.createdAt} type="relative" />

    <style jsx>{styles}</style>
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
