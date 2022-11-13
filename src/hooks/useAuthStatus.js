import { getAuth,onAuthStateChanged } from "firebase/auth"
import { useEffect,useState } from "react"


export const useAuthStatus = () => {

    const [LoggedIn ,setLoggedin] = useState(false);
    const [CheckStatus,setCheckStatus] = useState(true);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth,(user)=>{
          if(user){
            setLoggedin(true)
          }
          setCheckStatus(false)
        })

    },[])
  return {LoggedIn,CheckStatus}
}
