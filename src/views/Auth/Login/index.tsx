import { Head, Layout, LoginForm } from '~/components'

const Login = () => {
  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'login' }} />

      <LoginForm purpose="page" />
    </Layout.Main>
  )
}

export default Login
