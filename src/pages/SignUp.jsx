import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { setDoc,doc,serverTimestamp } from "firebase/firestore";
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {toast} from 'react-toastify';
import OAuth from "../components/OAuth";

function SignUp() {
  const [showpassword,setpassword] = useState(false);
  const [formData,setFormdata] = useState({
    name:'',
    email:'',
 password:'' })

 //destructured
 const {name,email,password}=formData;
 const navigate = useNavigate();
 //form
 const handleChange=(e)=>{
      
setFormdata(pre=>({...pre,[e.target.id]:e.target.value}))
 }
  
// on submit action 
 const onsubmit=async(e)=>{

  e.preventDefault();
  try{
    const auth = getAuth();
    // console.log(auth)
    const useCredential = await createUserWithEmailAndPassword(auth,email,password);
    const user = useCredential.user
    // console.log(user)

    updateProfile(auth.currentUser,{
      displayName:name
    })

    const formDataCopy = {...formData};
    delete formDataCopy.password
    formDataCopy.timestamp = serverTimestamp();

    await setDoc(doc(db,'users',user.uid),formDataCopy)
    navigate('/');

  }catch(error){
    const e = error.code;
    console.log(e);
    const a=e.split('/');
  
    toast.error(`${a[1]}`);
   
    
  }
 }

  return (
   <>
   <div className="pageContainer">
    <div>

   
    <header>
      <p className="pageHeader">
        welcome to Home marketplace
      </p>
    </header>
    <form onSubmit={onsubmit}> 
    <input type="text" 
      className="nameInput" 
      placeholder="Name" 
      id="name" 
      value={name} 
      onChange={handleChange}/>

      <input type="email" 
      className="emailInput" 
      placeholder="Email" 
      id="email" 
      value={email} 
      onChange={handleChange}/>

      <div className="passwordInputDiv">
      <input type={showpassword ? 'text' : 'password'} 
      className="passwordInput" 
      placeholder="Password"
      id="password"
      value={password}
      onChange={handleChange}
      />
       <img src={visibilityIcon} 
      
       alt="show password"  
       className="showPassword"
       onClick={()=>setpassword(pre=>!pre)}
       />

      </div>
<Link to='/forgot-password' 
className="forgotPasswordLink">Forgot Password</Link>
<div className="signUpBar">
  <p className="signUpText">
      Sign Up
  </p>
<button className="signUpButton">
  <ArrowRightIcon fill='#ffffff'
  width='34px'
  height='34px'
  />
  </button>
</div>
    </form>
   
   <OAuth/> 

    <Link to='/sign-in' className="registerLink"> Sign In instead </Link>
    
</div>
   </div>
   </>
  )
}

export default SignUp;