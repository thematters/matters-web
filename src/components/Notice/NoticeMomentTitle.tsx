import gql from 'graphql-tag'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { stripHtml, toPath, truncateNoticeTitle } from '~/common/utils'
import { NoticeMomentTitleFragment } from '~/gql/graphql'

import { Media, MomentDetailDialog } from '..'
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
    <>
      <Media at="sm">
        <Link {...path}>
          <a
            className={styles.noticeMomentTitle}
            data-test-id={TEST_ID.NOTICE_MOMENT_TITLE}
          >
            {title} {images}
          </a>
        </Link>
      </Media>
      <Media greaterThan="sm" className={styles.noticeMomentTitleContainer}>
        <MomentDetailDialog shortHash={moment.shortHash}>
          {({ openDialog }) => (
            <a
              href={path.href}
              className={styles.noticeMomentTitle}
              data-test-id={TEST_ID.NOTICE_MOMENT_TITLE}
              onClick={(e) => {
                e.preventDefault()
                openDialog()
              }}
            >
              {title} {images}
            </a>
          )}
        </MomentDetailDialog>
      </Media>
    </>
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
