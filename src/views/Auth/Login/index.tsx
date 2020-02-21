import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { Head, LoginForm } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import { TEXT } from '~/common/enums'

import styles from '../styles.css'

const Login = () => {
  const { updateHeaderState } = useContext(HeaderContext)
  useEffect(() => {
    updateHeaderState({ type: 'login' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  const containerClass = classNames({
    container: true,
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3': true
  })

  return (
    <main className="l-row full">
      <Head
        title={{ zh_hant: TEXT.zh_hant.login, zh_hans: TEXT.zh_hans.login }}
      />

      <article className={containerClass}>
        <LoginForm purpose="page" />
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default Login
