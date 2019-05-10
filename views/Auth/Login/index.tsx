import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import LoginForm from '~/components/Form/LoginForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Head } from '~/components/Head'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const Login = () => {
  const { updateHeaderState } = useContext(HeaderContext)
  useEffect(() => {
    updateHeaderState({ type: 'login' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  const containerClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-offset-sm-1',
    'l-col-md-4',
    'l-offset-md-2',
    'l-col-lg-6',
    'l-offset-lg-3',
    'container'
  )
  const formClass = ['l-col-4', 'l-col-sm-6', 'l-col-md-6', 'l-col-lg-8']

  return (
    <>
      <main className="l-row">
        <Head
          title={{ zh_hant: TEXT.zh_hant.login, zh_hans: TEXT.zh_hans.login }}
        />

        <article className={containerClass}>
          <LoginForm extraClass={formClass} purpose="page" />
        </article>
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default Login
