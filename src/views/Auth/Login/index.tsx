import {
  Head,
  Layout,
  // LoginForm
  LoginSignUpForm,
} from '~/components'

const Login = () => {
  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'login' }} />

      <LoginSignUpForm.Init purpose="page" />
    </Layout.Main>
  )
}

export default Login
