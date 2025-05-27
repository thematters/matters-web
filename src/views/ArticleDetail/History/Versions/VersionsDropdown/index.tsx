import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import { Z_INDEX } from '~/common/enums'
import { analytics, datetimeFormat, toPath } from '~/common/utils'
import { Dropdown, Icon, Label, Menu, useRoute } from '~/components'
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
        <span>
          {datetimeFormat.absolute.dateISO(new Date(version.createdAt))}
        </span>
      </span>
      <span
        className={classNames({
          [versionStyles.time]: true,
        })}
      >
        {datetimeFormat.absolute.timeISO(new Date(version.createdAt))}
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
  const { router, getQuery } = useRoute()
  const { shortHash, v, ...qs } = router.query

  const versions = article.versions.edges.map((edge) => edge?.node!)
  const currVersion = getQuery('v') || versions[0]?.id
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
                page: 'articleHistory',
                article,
                search: {
                  ...(qs as { [key: string]: string }), // forward qs to history page
                  v: version.id,
                },
              }).href
            }
            onClick={() => {
              analytics.trackEvent('click_button', {
                type: 'history_version',
                pageType: 'article_history',
              })
            }}
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
            <Icon icon={IconDown} size={20} />
          </button>
        )}
      </Dropdown>
    </section>
  )
}

export default VersionsDropdown
