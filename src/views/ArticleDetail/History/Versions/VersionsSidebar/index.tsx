import classNames from 'classnames'
import format from 'date-fns/format'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Label, useRoute } from '~/components'
import { VersionsArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const VersionsSidebar = ({ article }: { article: VersionsArticleFragment }) => {
  const { getQuery } = useRoute()

  const versions = article.versions.edges.map((edge) => edge?.node!)
  const currVersion = getQuery('v') || versions[0]?.id

  if (versions.length <= 1) {
    return null
  }

  return (
    <section className={styles.versions}>
      <ul>
        {versions.map((version, index) => (
          <li
            key={version.id}
            className={classNames({
              [styles.item]: true,
              [styles.active]: version.id === currVersion,
            })}
          >
            <Link
              href={
                toPath({
                  page: 'articleHistory',
                  article,
                  versionId: version.id,
                }).href
              }
            >
              <a className={styles.link}>
                <span className={styles.date}>
                  <span>
                    {format(new Date(version.createdAt), 'yyyy-MM-dd')}
                  </span>

                  {index === 0 && (
                    <Label color="green">
                      <FormattedMessage defaultMessage="Latest" id="adThp5" />
                    </Label>
                  )}
                </span>
                <span className={styles.time}>
                  {format(new Date(version.createdAt), 'HH:mm')}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default VersionsSidebar
