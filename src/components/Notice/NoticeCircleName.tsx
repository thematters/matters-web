import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'

import { NoticeCircleName as NoticeCircleNameType } from './__generated__/NoticeCircleName'

const NoticeCircleName = ({
  circle,
  path,
}: {
  circle: NoticeCircleNameType | null
  path?: { href: string; pathname?: string }
}) => {
  if (!circle) {
    return null
  }

  const circlePath = toPath({
    page: 'circleDetail',
    circle,
  })

  return <Link {...(path || circlePath)}>{circle.displayName}</Link>
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
