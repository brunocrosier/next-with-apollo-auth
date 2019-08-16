import { gql } from "apollo-boost"

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      firstName
    }
  }
`

export default ME_QUERY
