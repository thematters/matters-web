import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { Head, Layout, LoginForm } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'

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
    <Layout>
      <Head title={{ id: 'login' }} />

      <section className={containerClass}>
        <LoginForm purpose="page" />
      </section>

      <style jsx>{styles}</style>
    </Layout>
  )
}

export default Login
