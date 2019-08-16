import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const ALL_USERS = gql`
  query ALL_USERS {
    users {
      id
      firstName
      lastName
      email
    }
  }
`

const NewUsers = () => {
  const { error, loading, data: {users} } = useQuery(ALL_USERS)

  if (error) console.log(error.message)
  if (loading) return <p>Loading</p>

  return (
   users.map(user => {
      return (
        <div key={user.id}>
          <p key={user.id}>{`Name: ${user.firstName} ${user.lastName}`}</p>
          <p key={user.email}>{`Email: ${user.email}`}</p>
        </div>
      )
    })
  )
}

export default NewUsers
