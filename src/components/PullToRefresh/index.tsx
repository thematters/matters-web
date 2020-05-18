import { useEffect } from 'react'

const PullToRefresh = () => {
  useEffect(() => {
    let PTR: any

    import('pulltorefreshjs').then((ptr) => {
      PTR = ptr
      PTR.init({
        mainElement: 'body',
        onRefresh() {
          window.location.reload()
        },
      })
    })

    return () => {
      if (PTR) {
        PTR.destroyAll()
      }
    }
  }, [])

  return null
}

export default PullToRefresh
