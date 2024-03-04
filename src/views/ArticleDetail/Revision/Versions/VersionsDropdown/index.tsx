import classNames from 'classnames'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'

import { Z_INDEX } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Dropdown, IconDown20, Label, Menu, useRoute } from '~/components'
import { VersionsArticleFragment } from '~/gql/graphql'

import versionStyles from '../VersionsSidebar/styles.module.css'
import styles from './styles.module.css'

const Version = ({
  version,
  active,
  latest,
}: {
  version: { id: string; createdAt: string }
  active: boolean
  latest: boolean
}) => {
  return (
    <section
      className={classNames({
        [styles.version]: true,
        [versionStyles.active]: active,
      })}
    >
      <span
        className={classNames({
          [versionStyles.date]: true,
        })}
      >
        <span>{format(new Date(version.createdAt), 'yyyy-MM-dd')}</span>
      </span>
      <span
        className={classNames({
          [versionStyles.time]: true,
        })}
      >
        {format(new Date(version.createdAt), 'HH:mm')}
      </span>

      {latest && (
        <Label color="green">
          <FormattedMessage defaultMessage="Latest" id="adThp5" />
        </Label>
      )}
    </section>
  )
}

const VersionsDropdown = ({
  article,
}: {
  article: VersionsArticleFragment
}) => {
  const { getQuery } = useRoute()
  const currVersion = getQuery('version')

  const versions = article.versions.edges.map((edge) => edge?.node!)
  const version = versions.find((v) => v.id === currVersion)

  if (versions.length < 1 || !version) {
    return null
  }

  const SelectContent = () => {
    return (
      <Menu>
        {versions.map((version, index) => (
          <Menu.Item
            text={
              <Version
                version={version}
                active={version.id === currVersion}
                latest={index === 0}
              />
            }
            key={version.id}
            href={
              toPath({
                page: 'articleRevision',
                article,
                versionId: version.id,
              }).href
            }
          />
        ))}
      </Menu>
    )
  }

  return (
    <section className={styles.versions}>
      <Dropdown
        appendTo="parent"
        content={<SelectContent />}
        zIndex={Z_INDEX.OVER_DIALOG}
      >
        {({ openDropdown, ref }) => (
          <button
            onClick={openDropdown}
            aria-haspopup="listbox"
            ref={ref}
            type="button"
            className={styles.dropdownButton}
          >
            <Version
              version={version}
              active={version.id === currVersion}
              latest={versions[0].id === version.id}
            />
            <IconDown20 size="mdS" />
          </button>
        )}
      </Dropdown>
    </section>
  )
}

export default VersionsDropdown
