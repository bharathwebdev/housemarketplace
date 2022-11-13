 import { GoogleAuthProvider,signInWithPopup,getAuth } from "firebase/auth"
import { setDoc,getDoc,doc } from "firebase/firestore"
 import { useLocation,useNavigate } from "react-router-dom"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import googleIcon from '../assets/svg/googleIcon.svg'
import { serverTimestamp } from "firebase/firestore"

const OAuth = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const onGoogleClick=async()=>{
            try{

                const auth  = getAuth()
                const provider = new GoogleAuthProvider()
                const result = await signInWithPopup(auth,provider)
                const user  = result.user

                //check for user 
            const docRef = doc(db,'users',user.uid);
            const docSnap =await getDoc(docRef)

            // if user not exist in db create user
            if(!docSnap.exists()){

                await setDoc(doc(db,'users',user.uid),{
                    name:user.displayName,
                    email:user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/');

            }catch(e){
                    toast.error('Could not Log In') 
            }

    }
  return (
<div className="socialLogin">
    <p>sign {location.pathname ==='/sign-in'?'in' : 'up'} with</p>
    <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="Google Icon"/>
    </button>
</div>
  )
}

export default OAuth