import { Navigate,Outlet } from "react-router-dom"

import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"
const PrivateRoute = () => {
    const {LoggedIn,CheckStatus}=useAuthStatus()
    if(CheckStatus){
      return <Spinner/>
    }
  return  LoggedIn ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateRoute