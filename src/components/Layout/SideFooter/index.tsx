import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS, PATHS, Z_INDEX } from '~/common/enums'
import { Dropdown, Menu } from '~/components'

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
      <section className={styles.links}>
        <Link href={PATHS.ABOUT} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="About" id="g5pX+a" />
          </a>
        </Link>

        <Link href={PATHS.GUIDE} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Explore" id="7JlauX" />
          </a>
        </Link>

        <Link href={PATHS.TOS} legacyBehavior>
          <a>
            <FormattedMessage defaultMessage="Terms" id="xkr+zo" />
          </a>
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
