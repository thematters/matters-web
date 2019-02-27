import gql from 'graphql-tag'

import { DateTime } from '~/components'

import { NoticeDate as NoticeDateType } from './__generated__/NoticeDate'

const NoticeDate = ({ notice }: { notice: NoticeDateType }) => (
  <DateTime date={notice.createdAt} type="relative" />
)

NoticeDate.fragments = {
  notice: gql`
    fragment NoticeDate on Notice {
      id
      createdAt
    }
  `
}

export default NoticeDate
