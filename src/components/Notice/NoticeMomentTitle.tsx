import gql from 'graphql-tag'
import Link from 'next/link'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { NoticeMomentTitleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const NoticeMomentTitle = ({
  moment,
  title,
}: {
  moment: NoticeMomentTitleFragment | null
  title: string
}) => {
  if (!moment) {
    return null
  }

  const path = toPath({
    page: 'momentDetail',
    moment,
  })

  return (
    <Link {...path}>
      <a
        className={styles.noticeArticleTitle}
        data-test-id={TEST_ID.NOTICE_ARTICLE_TITLE}
      >
        {title}
      </a>
    </Link>
  )
}

NoticeMomentTitle.fragments = {
  moment: gql`
    fragment NoticeMomentTitle on Moment {
      content
      shortHash
      assets {
        id
      }
    }
  `,
}

export default NoticeMomentTitle
