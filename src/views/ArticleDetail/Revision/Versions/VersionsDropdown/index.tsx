import classNames from 'classnames'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'

import { Z_INDEX } from '~/common/enums'
import { Dropdown, IconDown20, Label, Menu } from '~/components'
import { VersionsArticleFragment } from '~/gql/graphql'

import versionStyles from '../VersionsSidebar/styles.module.css'
import styles from './styles.module.css'

const Version = ({
  version,
  active,
}: {
  version: { id: string; createdAt: string }
  active: boolean
}) => {
  return (
    <section className={styles.version}>
      <span
        className={classNames({
          [versionStyles.date]: true,
          [versionStyles.active]: active,
        })}
      >
        <span>{format(new Date(version.createdAt), 'yyyy-MM-dd')}</span>
      </span>
      <span
        className={classNames({
          [versionStyles.time]: true,
          [versionStyles.active]: active,
        })}
      >
        {format(new Date(version.createdAt), 'HH:mm')}
      </span>

      {active && (
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
  const versions = article.versions.edges.map((edge) => edge?.node!)

  if (versions.length < 1) {
    return null
  }

  const SelectContent = () => {
    return (
      <Menu>
        {versions.map((version, index) => (
          <Menu.Item
            text={<Version version={version} active={index === 0} />}
            key={version.id}
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
            <Version version={versions[0]} active />
            <IconDown20 size="mdS" />
          </button>
        )}
      </Dropdown>
    </section>
  )
}

export default VersionsDropdown
