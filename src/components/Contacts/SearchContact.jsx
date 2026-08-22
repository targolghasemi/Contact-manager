import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

import {Purple} from '../../helpers/colors'

const SearchContact = () => {
    const {contactSearch} = useContext(ContactContext)
    return(
        <div className="input-group mx-2 w-75 " dir="ltr">
        <span className="input-group-text" id="basic-addon1" style={{backgroundColor : Purple}}> 
        <i className="fas fa-search"/>
        </span>
        <input dir="rtl"
         type="text"
         onChange={event =>contactSearch(event.target.value)}
         className="form-control"
         placeholder="جستجوی مخاطب"
         aria-label="Search" 
         aria-description="basic-addon1"/>     
    </div>
    )
}

export default SearchContact;