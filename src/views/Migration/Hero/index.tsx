import Link from 'next/link'
import { useVisuallyHidden } from 'react-aria'
import { FormattedMessage } from 'react-intl'

import IconLogo from '@/public/static/icons/logo.svg'
import { PATHS } from '~/common/enums'
import { Icon } from '~/components'

import layoutStyles from '../../About/layout.module.css'
import styles from './styles.module.css'

const Hero = () => {
  const { visuallyHiddenProps } = useVisuallyHidden()

  return (
    <header className={[styles.hero, layoutStyles.container].join(' ')}>
      <div className={layoutStyles.content}>
        <div className={layoutStyles.columnFull}>
          <Link href={PATHS.HOME} className={styles.logo}>
            <span {...visuallyHiddenProps}>
              <FormattedMessage defaultMessage="Discover" id="cE4Hfw" />
            </span>
            <Icon icon={IconLogo} style={{ width: 120, height: 24.75 }} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Hero
