import { useQuery } from "@apollo/react-hooks"
import ME_QUERY from "../queries/ME_QUERY"

const Me = () => {
  const { data, error, loading } = useQuery(ME_QUERY)

  loading && <p>Loading</p>
  error && console.log(error.message)

  if (data.me !== undefined) {
    console.log(data.me.firstName)
    return (<p>your name is {data.me.firstName}</p>)
  }

  return <p>you are not signed in</p>
}

export default Me
