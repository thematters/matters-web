import classNames from 'classnames'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'

import { Z_INDEX } from '~/common/enums'
import { Dropdown, IconDown20, Label, Menu } from '~/components'

import versionStyles from '../VersionsSidebar/styles.module.css'
import styles from './styles.module.css'

const versions = [
  { id: 'UmV2aXNvbjox', createdAt: '2021-01-03T00:00:00Z' },
  { id: 'UmV2aXNvbjoy', createdAt: '2021-01-02T00:00:00Z' },
  { id: 'UmV2aXNvbjoz', createdAt: '2021-01-01T00:00:00Z' },
]

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

export const VersionsDropdown = () => {
  // TODO
  if (versions.length === 1) {
    return null
  }

  const SelectContent = ({ dropdown }: { dropdown?: boolean }) => {
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
        content={<SelectContent dropdown />}
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
