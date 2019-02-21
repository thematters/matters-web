import gql from 'graphql-tag'
import { useState } from 'react'
import { Mutation } from 'react-apollo'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-6 l-offset-lg-3">
        <h1>Login</h1>
        <Mutation
          mutation={gql`
            mutation UserLogin($input: UserLoginInput!) {
              userLogin(input: $input) {
                token
              }
            }
          `}
        >
          {login => {
            console.log({ email, password })
            return (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  login({ variables: { input: { email, password } } })
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
            )
          }}
        </Mutation>
      </article>
    </main>
  )
}

export default Login
