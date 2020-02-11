import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { Head, PageHeader, Translate } from '~/components'
import LoginForm from '~/components/Form/LoginForm'
import { HeaderContext } from '~/components/GlobalHeader/Context'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const Login = () => {
  const { updateHeaderState } = useContext(HeaderContext)
  useEffect(() => {
    updateHeaderState({ type: 'login' })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  const containerClass = classNames({
    container: true,
    'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4': true
  })

  return (
    <main className="l-row">
      <Head
        title={{ zh_hant: TEXT.zh_hant.login, zh_hans: TEXT.zh_hans.login }}
      />

      <article className={containerClass}>
        <PageHeader
          title={
            <Translate
              zh_hant={TEXT.zh_hant.login}
              zh_hans={TEXT.zh_hans.login}
            />
          }
          hasNoBorder
        />

        <section className="content">
          <LoginForm purpose="page" />
        </section>
      </article>

      <style jsx>{styles}</style>
    </main>
  )
}

export default Login
