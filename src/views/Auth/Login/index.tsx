import { Head, Layout, LoginForm } from '~/components'

import styles from '../styles.css'

const Login = () => {
  return (
    <div className="auth-page">
      <Layout>
        <Head title={{ id: 'login' }} />

        <LoginForm purpose="page" />
      </Layout>

      <style jsx>{styles}</style>
    </div>
  )
}

export default Login
