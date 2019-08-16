import { useState } from "react"
// import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import ME_QUERY from '../queries/ME_QUERY'
import SIGN_IN from '../mutations/SIGN_IN'


const SigninBox = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [signin, { error, loading, data }] = useMutation(SIGN_IN, {
    onCompleted(data) {
      const {login} = data
      console.log("token is:", login.token)
    }
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        signin({
          variables: {
            email,
            password
          },
          refetchQueries: [{ query: ME_QUERY }]
        })
      }}
    >
      {error && <p>Error is: {error.message}</p>}
      <input
        name="email"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <input
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button>{loading ? "Loading" : "Sign in"}</button>
    </form>
  )
}

export default SigninBox
