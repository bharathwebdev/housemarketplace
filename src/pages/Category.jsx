import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { 
    collection,
    where,
    orderBy,
    limit,
    getDocs,
    query,
    startAfter, 
    doc
} from "firebase/firestore"
import { db } from "../firebase.config"
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

const Category = () => {

    const [Listings ,setListings] = useState(null);
    const [loading,setLoading] = useState(true)
    const params = useParams();
    useEffect(()=>{
        const fetchListing = async()=>{
           try{
            //Get reference
                const listingsRef = collection(db,'listings')
            //create query

            const q = query(
                listingsRef,
                where('type','==',params.categoryName),
                orderBy('timestamp','desc'),
                limit(10)
                )
            //execute 

            const querySnapchat = await getDocs(q);

            let listings = []

            querySnapchat.forEach(doc => {
                 return listings.push({
                    id:doc.id,
                    data:doc.data()
                 })
            });

         setListings(listings)
         setLoading(false);
     

    
           }catch(e){
                toast.error('could not fetch listings');
           }
        }
        fetchListing();
    },[params.categoryName])
  
  return (
    <div className="category">
        <header>
            <p className="pageHeader">
             {params.categoryName ==='rent' ? 'Places for rent ' : 'place for sale'}
            </p>
        </header>

    {loading ? (<Spinner/> ): Listings && Listings.length > 0 ? (
        <>
      <main>
        <ul className="categoryListings">
         {Listings.map(data=>{
                return <ListingItem 
                        key={data.id}  
                        listings={data.data} 
                        id={data.id}
                
                />
            })}
        </ul>
      </main>
        </>
    ) : <p>Listing not avaliable  for {params.categoryName}</p>}

    </div>
  )
  
}

export default Category