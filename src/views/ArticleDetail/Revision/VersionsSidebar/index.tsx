import classNames from 'classnames'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'

import { Label } from '~/components'

import styles from './styles.module.css'

const versions = [
  { id: 'UmV2aXNvbjox', createdAt: '2021-01-03T00:00:00Z' },
  { id: 'UmV2aXNvbjoy', createdAt: '2021-01-02T00:00:00Z' },
  { id: 'UmV2aXNvbjoz', createdAt: '2021-01-01T00:00:00Z' },
]

export const VersionsSidebar = () => {
  return (
    <section className={styles.versions}>
      <ul>
        {versions.map((version, index) => (
          <li
            key={version.id}
            className={classNames({
              [styles.item]: true,
              [styles.active]: index === 0,
            })}
          >
            <a href={`#${version.id}`} className={styles.link}>
              <span className={styles.date}>
                <span>{format(new Date(version.createdAt), 'yyyy-MM-dd')}</span>

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
          </li>
        ))}
      </ul>
    </section>
  )
}
