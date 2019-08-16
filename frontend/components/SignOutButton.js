import { useQuery, useMutation } from "@apollo/react-hooks"
import Router from "next/router"
import ME_QUERY from "../queries/ME_QUERY"
import SIGN_OUT from "../mutations/SIGN_OUT"

const SignOutButton = () => {
  const [logout, { data, error, loading }] = useMutation(SIGN_OUT, {
    onCompleted() {
      console.log("signed you OUT!!")
      Router.reload()
    }
  })

  // destructure and rename `loading` `error` and `data` to avoid conflict with above consts
  const {
    loading: queryloading,
    error: queryerror,
    data: querydata
  } = useQuery(ME_QUERY)

  if (querydata === undefined || querydata.me === undefined) {
    return <p>you aren't signed in</p>
  } else {
    return (
      <button
        onClick={() => {
          logout()
        }}
      >
        Sign Out
      </button>
    )
  }
}

export default SignOutButton
