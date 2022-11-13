import { Link } from "react-router-dom"

import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
const ListingItem = ({listings,id,onDelete}) => {
    const  {name,
        type,
        imageUrls,
        location,
        regularPrice,
        offer,
        bedrooms,
        bathrooms,
        discountedPrice}=listings
  return (
    <li className="categoryListing">
        <Link to={`/category/${type}/${id}`}
                className='categoryListingLink'>
                    <img src={imageUrls[0]}
                     alt={name}
                     className='categoryListingImg'/>

                     <div className="categoryListingDetails">
                        <p className="categoryListingLocation">
                             {location}
                        </p>
                        <p className="catgeoryListingName">
                            {name}
                        </p>
                        <p className="categoryListingPrice">
                           ${offer ? discountedPrice 
                           .toString()
                           .replace(/\B(?=(\d{3})+(?!\d))/g,',')
                           : regularPrice}
                           {type ==='rent' && ' / Month'} 
                           
                            </p>
                            <div className="categoryListingInfoDiv">
                                <img src={bedIcon} alt='bath'/>
                                <p className="catgeoryListingInfoText">
                                    {bedrooms > 1 ? `${bedrooms} Bedrooms` : `1 bedroom`}
                                </p>
                                <img src={bathtubIcon} alt='bed'/>
                                <p className="catgeoryListingInfoText">
                                    {bathrooms > 1 ? `${bathrooms} Bathrooms` : `1 bathroom`}
                                </p>
                            </div>
                     </div>

        </Link>
        {onDelete && (
            <DeleteIcon className="removeIcon "
                    fill="rgb(231,76,60)"
                    onClick={()=>onDelete(id,name)}/>
        )}

    </li>

  )
}

export default ListingItem