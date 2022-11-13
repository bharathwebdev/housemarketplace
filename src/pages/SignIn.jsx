import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import{toast} from 'react-toastify';
import OAuth from "../components/OAuth";


function SignIn() {
  const [showpassword,setpassword] = useState(false);
  const [formData,setFormdata] = useState({
    email:'',
 password:'' })
 
 //destructured
 const {email,password}=formData;
 const navigate = useNavigate();
 //form
 const handleChange=(e)=>{
      
setFormdata(pre=>({...pre,[e.target.id]:e.target.value}))
 }
  
 const onSubmit=async(e)=>{

e.preventDefault();
try{
  const auth = getAuth();
  
  const userCredential = await signInWithEmailAndPassword(auth,email,password);
  if(userCredential.user){
 
    navigate('/');

  }
  toast.success('Sucessfully Logged In ')

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
        welcome back
      </p>
    </header>
    <form onSubmit={onSubmit}>
      <input type="email" 
      className="emailInput" 
      placeholder="Email" 
      id="email" 
      value={email} 
      onChange={handleChange} required/>

      <div className="passwordInputDiv">
      <input type={showpassword ? 'text' : 'password'} 
      className="passwordInput" 
      placeholder="Password"
      id="password"
      value={password}
      onChange={handleChange}
      required
      />
       <img src={visibilityIcon} 
      
       alt="show password"  
       className="showPassword"
       onClick={()=>setpassword(pre=>!pre)}
       />

      </div>
<Link to='/forgot-password' 
className="forgotPasswordLink">Forgot Password</Link>
<div className="signInBar">
  <p className="signInText">
      Sign in 
  </p>
<button className="signInButton">
  <ArrowRightIcon fill='#ffffff'
  width='34px'
  height='34px'
  />
  </button>
</div>
    </form>
   
   <OAuth/>

    <Link to='/sign-up' className="registerLink">Sign up Instead</Link>
    
</div>

   </div>
   </>
  )
}

export default SignIn;