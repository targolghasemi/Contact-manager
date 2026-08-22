import { createContext } from "react";

export const ContactContext = createContext({
    loading:false,
    setLoading:() =>{},
    setContacts: () =>{},
    setFilteredContacts:()=>{},
    contacts:[],
    //errors:[],
    filteredContacts:[],
    groups:[],
    deleteContact:()=>{},
    createContact:()=>{},
    contactSearch:()=>{}

})