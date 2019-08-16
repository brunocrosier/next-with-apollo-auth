import { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import CREATE_USER from "../mutations/CREATE_USER"

const RegisterBox = ({ client }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [createUser, { error, loading, data }] = useMutation(CREATE_USER, {
    onCompleted(data) {
      console.log(data)
    }
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        createUser({
          variables: {
            name,
            email,
            password
          }
        })
      }}
    >
      {error && <p>Issue occurred while registering :(</p>}

      <input
        name="name"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />
      <input
        name="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <input
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />
      <br />
      <button>Register</button>
    </form>
  )

  
}

export default RegisterBox
