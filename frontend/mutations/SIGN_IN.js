import { gql } from "apollo-boost"

 const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default SIGN_IN
