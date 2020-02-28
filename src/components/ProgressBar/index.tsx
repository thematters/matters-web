import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'

import styles from './styles.css'

export const ProgressBar = () => {
  const showAfterMs = 300
  let timer: any = null

  const routeChangeStart = () => {
    clearTimeout(timer)
    timer = setTimeout(NProgress.start, showAfterMs)
  }

  const routeChangeEnd = () => {
    clearTimeout(timer)
    NProgress.done()
  }

  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    Router.events.on('routeChangeStart', routeChangeStart)
    Router.events.on('routeChangeComplete', routeChangeEnd)
    Router.events.on('routeChangeError', routeChangeEnd)

    return () => {
      clearTimeout(timer)
      Router.events.off('routeChangeStart', routeChangeStart)
      Router.events.off('routeChangeComplete', routeChangeEnd)
      Router.events.off('routeChangeError', routeChangeEnd)
    }
  }, [])

  return (
    <style jsx global>
      {styles}
    </style>
  )
}
