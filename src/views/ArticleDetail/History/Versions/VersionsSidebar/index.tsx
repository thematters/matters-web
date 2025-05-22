import classNames from 'classnames'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import Sticky from 'react-stickynode'

import { analytics, datetimeFormat, toPath } from '~/common/utils'
import { Label, useRoute } from '~/components'
import { VersionsArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const VersionsSidebar = ({ article }: { article: VersionsArticleFragment }) => {
  const { router, getQuery } = useRoute()
  const { shortHash, v, ...qs } = router.query

  const versions = article.versions.edges.map((edge) => edge?.node!)
  const currVersion = getQuery('v') || versions[0]?.id

  if (versions.length < 1) {
    return null
  }

  // 42px top banner + 32px spacing
  return (
    <Sticky top={74}>
      <section className={styles.versions}>
        <ul>
          {versions.map((version, index) => (
            <li
              key={version.id}
              className={classNames({
                [styles.item]: true,
                [styles.active]: version.id === currVersion,
              })}
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'history_version',
                  pageType: 'article_history',
                })
              }}
            >
              <Link
                href={
                  toPath({
                    page: 'articleHistory',
                    article,
                    search: {
                      ...(qs as {
                        [key: string]: string
                      }), // forward qs to history page
                      v: version.id,
                    },
                  }).href
                }
                className={styles.link}
              >
                <span className={styles.date}>
                  <span>
                    {datetimeFormat.absolute.dateISO(
                      new Date(version.createdAt)
                    )}
                  </span>

                  {index === 0 && (
                    <Label color="green">
                      <FormattedMessage defaultMessage="Latest" id="adThp5" />
                    </Label>
                  )}
                </span>
                <span className={styles.time}>
                  {datetimeFormat.absolute.timeISO(new Date(version.createdAt))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Sticky>
  )
}

export default VersionsSidebar
