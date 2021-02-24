import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'

import { NoticeCircleName as NoticeCircleNameType } from './__generated__/NoticeCircleName'

const NoticeCircleName = ({
  circle,
}: {
  circle: NoticeCircleNameType | null
}) => {
  if (!circle) {
    return null
  }

  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  return (
    <Link {...path}>
      <a>{circle.displayName}</a>
    </Link>
  )
}

NoticeCircleName.fragments = {
  circle: gql`
    fragment NoticeCircleName on Circle {
      id
      name
      displayName
    }
  `,
}

export default NoticeCircleName
