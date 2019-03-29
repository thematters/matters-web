import { useContext, useEffect } from 'react'

import { Head } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

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
        <Goal />
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}
