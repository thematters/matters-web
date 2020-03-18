import { Head, Layout, LoginForm } from '~/components'

const Login = () => {
  return (
    <Layout bgColor="grey-lighter">
      <Head title={{ id: 'login' }} />

      <LoginForm purpose="page" />
    </Layout>
  )
}

export default Login
