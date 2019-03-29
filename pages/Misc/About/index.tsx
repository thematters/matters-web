import { useContext, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'

import { Head } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import Features from './Features'
import Goal from './Goal'
import Slogan from './Slogan'
import styles from './styles.css'

export default () => {
  const { updateHeaderState } = useContext(HeaderContext)
  useEffect(() => {
    updateHeaderState({ type: 'about', bgColor: 'transparent' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  return (
    <main>
      <Head title={{ zh_hant: '關於我們', zh_hans: '关于我们' }} />

      <article>
        <Slogan />
        <Waypoint
          onEnter={() => {
            updateHeaderState({ type: 'about', bgColor: 'transparent' })
          }}
          onLeave={() => {
            updateHeaderState({ type: 'about', bgColor: 'default' })
          }}
        />
        <Goal />
        <Features />
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}
