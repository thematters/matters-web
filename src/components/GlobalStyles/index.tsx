import { useEffect } from 'react'

import { useWindowResize } from '~/components'

export const GlobalStyles = () => {
  const size = useWindowResize()
  const height = size[1]

  useEffect(() => {
    if (height) {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = height * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--reach-dialog', '1')
  }, [])

  return <></>
}
