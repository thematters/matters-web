import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'

import { NoticeCircleNameCircle } from './__generated__/NoticeCircleNameCircle'

const NoticeCircleName = ({
  circle,
}: {
  circle: NoticeCircleNameCircle | null
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
    fragment NoticeCircleNameCircle on Circle {
      id
      name
      displayName
    }
  `,
}

export default NoticeCircleName
