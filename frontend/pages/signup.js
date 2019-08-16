import { useState } from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import ME_QUERY from "../queries/ME_QUERY"
import Router from "next/router"

const SIGN_UP = gql`
  mutation SIGN_UP(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      token
    }
  }
`

const SignUp = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Mutation
      mutation={SIGN_UP}
      onError={error => {
        console.log(error)
      }}
      refetchQueries={[{ query: ME_QUERY }]}
      onCompleted={() => {
        Router.push("/")
      }}
    >
      {(signup, { data, loading, error }) => (
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            signup({
              variables: {
                email,
                password,
                firstName,
                lastName,
                userName
              }
            })
          }}
        >
          {error && <p>{error.message}</p>}
          <input
            name="firstName"
            placeholder="First Name"
            // autoComplete="off"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <br />
          <input
            name="lastName"
            placeholder="Last Name"
            // autoComplete="off"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <br />
          <input
            name="userName"
            placeholder="User Name"
            // autoComplete="off"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <br />
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
          <button>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      )}
    </Mutation>
  )
}

export default SignUp
