import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'

const ProgressBar = () => {
  const router = useRouter()

  const showAfterMs = 300
  let timer: ReturnType<typeof setTimeout>

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

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeEnd)
    router.events.on('routeChangeError', routeChangeEnd)

    return () => {
      clearTimeout(timer)
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeEnd)
      router.events.off('routeChangeError', routeChangeEnd)
    }
  }, [])

  return <></>
}

export default ProgressBar
