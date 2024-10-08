import gql from 'graphql-tag'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { stripHtml, toPath, truncateNoticeTitle } from '~/common/utils'
import { NoticeMomentTitleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const NoticeMomentTitle = ({
  moment,
}: {
  moment: NoticeMomentTitleFragment
}) => {
  const intl = useIntl()

  const path = toPath({
    page: 'momentDetail',
    moment,
  })

  const title = truncateNoticeTitle(
    stripHtml(moment.content || '', { ensureMentionTrailingSpace: true })
  )
  const images = moment.assets.length
    ? intl
        .formatMessage({ defaultMessage: `[image]`, id: 'W3tqQO' })
        .repeat(Math.min(3, moment.assets.length))
    : ''

  return (
    <Link {...path}>
      <a
        className={styles.noticeMomentTitle}
        data-test-id={TEST_ID.NOTICE_MOMENT_TITLE}
      >
        {title} {images}
      </a>
    </Link>
  )
}

NoticeMomentTitle.fragments = {
  moment: gql`
    fragment NoticeMomentTitle on Moment {
      id
      state
      content
      shortHash
      assets {
        id
      }
    }
  `,
}

export default NoticeMomentTitle
