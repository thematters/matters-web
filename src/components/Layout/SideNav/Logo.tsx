import Link from 'next/link'
import { useIntl } from 'react-intl'

import { PATHS } from '~/common/enums'
import { IconLogoGraph } from '~/components'

import styles from './styles.module.css'

const Logo = () => {
  const intl = useIntl()

  return (
    <section className={styles.logo}>
      <Link href={PATHS.HOME} legacyBehavior>
        <a
          aria-label={intl.formatMessage({
            defaultMessage: 'Discover',
          })}
        >
          <IconLogoGraph />
        </a>
      </Link>
    </section>
  )
}

export default Logo
