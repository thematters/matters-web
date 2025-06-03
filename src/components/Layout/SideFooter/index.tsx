import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS, PATHS, Z_INDEX } from '~/common/enums'
import { Dropdown, LanguageSwitch, Menu } from '~/components'

import styles from './styles.module.css'

const CommunityMenu = () => {
  return (
    <Menu>
      <Menu.Item
        text={
          <FormattedMessage defaultMessage="Matters Community" id="FhWC22" />
        }
        href={PATHS.COMMUNITY}
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Open Source" id="Xd0J7Y" />}
        htmlHref={EXTERNAL_LINKS.DEVELOPER_RESOURCE}
        htmlTarget="_blank"
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Bug Report" id="9Fpc9S" />}
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
        <Link href={PATHS.ABOUT}>
          <FormattedMessage defaultMessage="About" id="g5pX+a" />
        </Link>

        <Link href={PATHS.GUIDE}>
          <FormattedMessage defaultMessage="Explore" id="7JlauX" />
        </Link>

        <Link href={PATHS.TOS}>
          <FormattedMessage defaultMessage="Terms" id="xkr+zo" />
        </Link>

        <Dropdown content={<CommunityMenu />} zIndex={Z_INDEX.OVER_DIALOG}>
          {({ openDropdown, ref }) => (
            <button onClick={openDropdown} ref={ref}>
              <FormattedMessage defaultMessage="Community" id="4CrCbD" />
            </button>
          )}
        </Dropdown>
      </section>
    </footer>
  )
}

export default SideFooter
