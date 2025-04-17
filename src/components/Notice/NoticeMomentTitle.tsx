import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import { MAX_NOTICE_SUMMARY_LENGTH, TEST_ID } from '~/common/enums'
import { MOMENT_DIGEST_REFERRER } from '~/common/enums/moment'
import { makeSummary, sessionStorage, toPath } from '~/common/utils'
import { useRoute } from '~/components'
import { NoticeMomentTitleFragment } from '~/gql/graphql'

import { Media, MomentDetailDialog } from '..'
import styles from './styles.module.css'

const NoticeMomentTitle = ({
  moment,
}: {
  moment: NoticeMomentTitleFragment
}) => {
  const intl = useIntl()
  const { router } = useRoute()

  const path = toPath({
    page: 'momentDetail',
    moment,
  })

  const title = makeSummary(
    moment.content || '',
    MAX_NOTICE_SUMMARY_LENGTH,
    '\n'
  )
  const images = moment.assets.length
    ? intl
        .formatMessage({ defaultMessage: `[image]`, id: 'W3tqQO' })
        .repeat(Math.min(3, moment.assets.length))
    : ''

  const goToMomentDetail = () => {
    setReferrer()
    router.push(path.href)
  }

  const setReferrer = () => {
    sessionStorage.set(MOMENT_DIGEST_REFERRER, true)
  }

  return (
    <>
      <Media lessThan="md">
        <a
          href={path.href}
          className={styles.noticeMomentTitle}
          data-test-id={TEST_ID.NOTICE_MOMENT_TITLE}
          onClick={(e) => {
            e.preventDefault()
            goToMomentDetail()
          }}
        >
          {title} {images}
        </a>
      </Media>
      <Media
        greaterThanOrEqual="md"
        className={styles.noticeMomentTitleContainer}
      >
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
