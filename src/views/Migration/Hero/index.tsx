import { VisuallyHidden } from '@reach/visually-hidden'
import Link from 'next/link'
import { useContext } from 'react'

import { PATHS } from '~/common/enums'
import { translate } from '~/common/utils'
import { IconLogo, LanguageContext } from '~/components'

import layoutStyles from '../../About/layout.module.css'
import styles from './styles.module.css'

const Hero = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <header className={[styles.hero, layoutStyles.container].join(' ')}>
      <div className={layoutStyles.content}>
        <div className={layoutStyles.columnFull}>
          <Link href={PATHS.HOME} legacyBehavior>
            <a className={styles.logo}>
              <VisuallyHidden>
                <span>{translate({ id: 'discover', lang })}</span>
              </VisuallyHidden>
              <IconLogo />
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Hero
