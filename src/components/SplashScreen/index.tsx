import { useEffect, useState } from 'react'

import { withIcon } from '~/components'

import { sleep } from '~/common/utils'
import { ReactComponent as IconSplashScreenLogo } from '~/static/icons/splash-scren-logo.svg'

import styles from './styles.css'

const SplashScreen = () => {
  const [show, setShow] = useState(true)
  const hide = () => setShow(false)

  useEffect(() => {
    if (document.readyState === 'loading') {
      // loading yet, wait for the event
      document.addEventListener('DOMContentLoaded', hide)
    } else {
      // DOM is ready!
      const waitThenHide = async () => {
        await sleep(1000)
        hide()
      }
      waitThenHide()
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', hide)
    }
  })

  if (!show) {
    return null
  }

  return (
    <div className="splash-screen" aira-label="Matters Logo, Splash Screen">
      {withIcon(IconSplashScreenLogo)({})}

      <style jsx>{styles}</style>
    </div>
  )
}

export default SplashScreen
