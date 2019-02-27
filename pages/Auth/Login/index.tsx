import classNames from 'classnames'
import Router from 'next/router'

import { Form } from '~/components/Form'

import styles from './styles.css'

const Login = () => {
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

  const redirect = () => Router.replace('/')

  return (
    <>
      <main className="l-row row">
        <article className={containerClass}>
          <Form.LoginForm
            extraClass={formClass}
            purpose="page"
            submitCallback={redirect}
          />
        </article>
      </main>
      <style jsx>{styles}</style>
    </>
  )
}

export default Login
