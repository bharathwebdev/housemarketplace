import { Link } from "react-router-dom";
import { db } from "../firebase.config";
import { 
  collection,
  where,
  orderBy,
  limit,
  getDocs,
  query,
  startAfter, 

} from "firebase/firestore"
import ListingItem from "../components/ListingItem";
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner";
import { useEffect,useState } from "react";
function Offers () {
const [listing,setListings] = useState(null)
const [loading ,setLoading] = useState(true)

useEffect(()=>{
    const fetchList=async()=>{
      try{
        //get reference
          const listRef = collection(db,'listings');
          // create query

          const q = query(listRef,
            where('offer','==',true),
            orderBy('timestamp','desc'),
            limit(10)
            )

            //get snapshot of the data
            const querySnap = await getDocs(q);
            let listing = [];

            querySnap.forEach(doc=>{
                return listing.push({
                  id:doc.id,
                  data:doc.data()
                })
            })
            setListings(listing)
           
            setLoading(false)
      }catch(e){
        toast.error('Could not fectch the Offers List')
      }
    }
    fetchList();

  },[])

    return (
      <div className="category">
      <header>
          <p className="pageHeader">
           offers
          </p>
      </header>

  {loading ? (<Spinner/> ): listing && listing.length > 0 ? (
      <>
    <main>
      <ul className="categoryListings">
       {listing.map(data=>{
              return <ListingItem 
                      key={data.id}  
                      listings={data.data} 
                      id={data.id}
              
              />
          })}
      </ul>
    </main>
      </>
  ) : <p>There are no Offers </p>}

  </div>
    )
  }
  
  export default Offers;