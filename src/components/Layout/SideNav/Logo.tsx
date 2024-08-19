import Link from 'next/link'
import { useIntl } from 'react-intl'

import { ReactComponent as IconLogoGraph } from '@/public/static/icons/logo-graph.svg'
import { PATHS } from '~/common/enums'
import { Icon } from '~/components'

import styles from './styles.module.css'

const Logo = () => {
  const intl = useIntl()

  return (
    <section className={styles.logo}>
      <Link href={PATHS.HOME} legacyBehavior>
        <a
          aria-label={intl.formatMessage({
            defaultMessage: 'Discover',
            id: 'cE4Hfw',
          })}
        >
          <Icon icon={IconLogoGraph} style={{ width: 48, height: 33 }} />
        </a>
      </Link>
    </section>
  )
}

export default Logo
