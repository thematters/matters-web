import { useContext } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import { ViewerContext, withIcon } from '~/components'

import { ReactComponent as IconSplashScreenLogo } from '@/public/static/icons/splash-scren-logo.svg'

import styles from './styles.css'

const SplashScreen = () => {
  const viewer = useContext(ViewerContext)

  if (viewer.privateFetched) {
    return null
  }

  return (
    <RemoveScroll>
      <div className="splash-screen" aira-label="Matters Logo, Splash Screen">
        {withIcon(IconSplashScreenLogo)({})}

        <style jsx>{styles}</style>
      </div>
    </RemoveScroll>
  )
}

export default SplashScreen
