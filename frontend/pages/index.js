import { useQuery } from "@apollo/react-hooks"
import SigninBox from "../components/SigninBox"
import SignOutButton from "../components/SignOutButton"
import ME_QUERY from "../queries/ME_QUERY"

const NewHome = () => {
  const { loading, error, data } = useQuery(ME_QUERY)

  if (error) console.log("error message is: ", error.message)
  if (loading) return <p>loading</p>

  if (data === undefined || data.me === undefined || data.me === null) {
    return (
      <>
        <p>You are not signed in!</p>
        
        {/* <p>process.env.NODE_ENV is {process.env.NODE_ENV}</p>
        <p>process.env.BACKEND_URI is {process.env.BACKEND_URI}</p> */}
        <SigninBox />
      </>
    )
  } else {
    return (
      <>
        <p>Hi, {data.me.firstName}</p>
        <p>process.env.NODE_ENV is {process.env.NODE_ENV}</p>

        <SignOutButton />
      </>
    )
  }
}

export default NewHome
