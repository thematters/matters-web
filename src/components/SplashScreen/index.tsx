import { useContext } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import { ReactComponent as IconSplashScreenLogo } from '@/public/static/icons/splash-scren-logo.svg'
import { translate } from '~/common/utils'
import { LanguageContext, ViewerContext, withIcon } from '~/components'

import styles from './styles.css'

const SplashScreen = () => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  if (viewer.privateFetched) {
    return null
  }

  return (
    <RemoveScroll>
      <div
        className="splash-screen"
        aria-label={translate({
          zh_hant: '啟動頁',
          zh_hans: '启动页',
          en: 'Splash Screen',
          lang,
        })}
      >
        {withIcon(IconSplashScreenLogo)({})}

        <style jsx>{styles}</style>
      </div>
    </RemoveScroll>
  )
}

export default SplashScreen
