import { Login } from "./Login"
import "../styles/login.scss"

export const LoginError = (props) => {
  const notLoggedIn = "You are not logged in, please log in."

  return (
    <>
      <Login redirectPath={props.redirectPath}/>
      <h1 className="login-error">
        {notLoggedIn}
      </h1>
    </>
  )
}