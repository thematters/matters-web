import { useEffect, useState } from 'react'

import { withIcon } from '~/components'

import { ReactComponent as IconSplashScreenLogo } from '~/static/icons/splash-scren-logo.svg'

import styles from './styles.css'

const SplashScreen = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }, [])

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
