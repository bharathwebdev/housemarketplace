import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {updateDoc,doc} from 'firebase/firestore'
import {db} from '../firebase.config';
import {getAuth,updateProfile} from 'firebase/auth';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import HomeIcon from '../assets/svg/homeIcon.svg'
function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
 const [changeDetails,setChangeDetails]=useState(false);
  const [FormData,setFormData] = useState({
   name : auth.currentUser.displayName,
   email:auth.currentUser.email
  });
  const {name,email} = FormData;

  const onLogout=()=>{

   auth.signOut();
   navigate('/');
   toast.success('Sucessfully Logged Out')

  }

  const onsubmit=async()=>{ 

    try{

      if(auth.currentUser.displayName!==name){
        //update name
        await updateProfile(auth.currentUser,{
          displayName:name
        })
        const  userRef=doc(db,'users',auth.currentUser.uid);
        await updateDoc(userRef,{
          name
        })
        toast.success('profile Updated');
      }
    }catch(error){
          toast.error('Could not update profile details');
    }
  }
  const onChange=(e)=>{
     setFormData(pre=>({...pre,[e.target.id]:e.target.value}))
  }

  return (
<div className='profile'>
  <header className="profileHeader">
    <p className="pageHeader">My Profile</p>
      <button type='button' 
      className="logOut"
      onClick={onLogout}
      >
        Logout
      </button>
  
  </header>
  <main>

     <div className="profileDetailsHeader">
      <p className="profileDetailsText">
        Personal Details
      </p>
      <p className='changePersonalDetails' 
      onClick={()=>{
      changeDetails && onsubmit()
      setChangeDetails(pre=>!pre)
      }
      }>
        {changeDetails ? 'Done' : 'Change'}
      </p>
</div>
<div className="profileCard">
  <form >
    <input type="text" 
    id="name" 
    disabled={!changeDetails}
    className={!changeDetails ? 'profileName' : 'profileNameActive'}
    onChange={onChange}
    value={name}
     />

<div className='profileEmail'>
{email}
</div>
  </form>
</div>

<Link to='/create-listing' className='createListing' >
  <img src={HomeIcon} alt='home'/> 
  <p>sell or rent your Home</p>
  <img src={arrowRight} alt='arrow right' />
</Link>

  </main>
</div>    
  )
}

export default Profile; 