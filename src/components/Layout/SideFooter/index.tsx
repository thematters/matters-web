import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS, PATHS, Z_INDEX } from '~/common/enums'
import { Dropdown, IconDotDivider, LanguageSwitch, Menu } from '~/components'

import styles from './styles.module.css'

const CommunityMenu = () => {
  return (
    <Menu>
      <Menu.Item
        text={<FormattedMessage defaultMessage="Matters Community" />}
        href={PATHS.COMMUNITY}
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Open Source" />}
        htmlHref={EXTERNAL_LINKS.DEVELOPER_RESOURCE}
        htmlTarget="_blank"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Bug Report" />}
        htmlHref={EXTERNAL_LINKS.BUG_REPORT}
        htmlTarget="_blank"
      />
    </Menu>
  )
}

const SideFooter = () => {
  return (
    <footer className={styles.footer}>
      <LanguageSwitch />

      <section className={styles.links}>
        <Link href={PATHS.ABOUT} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="About" />
          </a>
        </Link>

        <IconDotDivider style={{ width: 16, height: 16 }} />

        <Link href={PATHS.GUIDE} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Explore" />
          </a>
        </Link>

        <IconDotDivider style={{ width: 16, height: 16 }} />

        <Link href={PATHS.TOS} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Terms" />
          </a>
        </Link>

        <IconDotDivider style={{ width: 16, height: 16 }} />

        <Dropdown content={<CommunityMenu />} zIndex={Z_INDEX.OVER_DIALOG}>
          {({ openDropdown, ref }) => (
            <button onClick={openDropdown} ref={ref}>
              <FormattedMessage defaultMessage="Community" />
            </button>
          )}
        </Dropdown>
      </section>
    </footer>
  )
}

export default SideFooter
