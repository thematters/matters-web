import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconLogo } from '@/public/static/icons/logo.svg'
import { PATHS } from '~/common/enums'
import { Icon } from '~/components'

import layoutStyles from '../../About/layout.module.css'
import styles from './styles.module.css'

const Hero = () => {
  return (
    <header className={[styles.hero, layoutStyles.container].join(' ')}>
      <div className={layoutStyles.content}>
        <div className={layoutStyles.columnFull}>
          <Link href={PATHS.HOME} legacyBehavior>
            <a className={styles.logo}>
              <VisuallyHidden>
                <span>
                  <FormattedMessage defaultMessage="Discover" id="cE4Hfw" />
                </span>
              </VisuallyHidden>
              <Icon icon={IconLogo} style={{ width: 120, height: 24.75 }} />
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Hero
