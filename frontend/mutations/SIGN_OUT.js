import { gql } from "apollo-boost"

const SIGN_OUT = gql`
  mutation SIGN_OUT {
    logout {
      message
    }
  }
`

export default SIGN_OUT
