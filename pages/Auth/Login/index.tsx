import gql from 'graphql-tag'
import Router from 'next/router'
import { useState } from 'react'
import { Mutation } from 'react-apollo'

export const USER_LOGIN = gql`
  mutation UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      auth
    }
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-6 l-offset-lg-3">
        <h1>Login</h1>
        <Mutation mutation={USER_LOGIN}>
          {login => (
            <form
              onSubmit={e => {
                e.preventDefault()
                login({ variables: { input: { email, password } } }).then(() =>
                  Router.replace('/')
                ) // redirect to home after loggin in
              }}
            >
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="enter you email"
              />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="enter password"
              />
              <input type="submit" value="Login" />
            </form>
          )}
        </Mutation>
      </article>
    </main>
  )
}

export default Login
