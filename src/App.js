import { useEffect } from "react";
import {Routes,Route,Navigate,useNavigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import { confirmAlert } from "react-confirm-alert";
import { useImmer } from "use-immer";
import { ToastContainer, toast } from "react-toastify";

import _ from "lodash"

import { ContactContext } from "./context/contactContext";

import { AddContact,Contacts,EditContact,ViewContact } from "./components";
import { CurrentLine, Purple , Yellow,Comment } from "./helpers/colors";
//import { contactSchema } from "./validations/contactValidation";

import {getAllContacts,getAllGroups , createContact,deleteContact} from "./services/contactService"

import "./App.css";

const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] =  useImmer([]);
  const [filteredContacts, setFilteredContacts] =  useImmer([]);
  const [groups, setGroups] =  useImmer([]);
  const [contact, setContact] =  useImmer({
  });
 // const [errors, setErrors] = useState([])

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        setLoading(true);
        const { data : contactsData} = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        console.log(contactsData);
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      }catch(err){
        
        setLoading(false)
      }
    }
    fetchData();
  },[])



const createContactForm = async (values) =>{
 // event.preventDefault();
  try {
    setLoading((draft) => !draft)
    const {status,data} = await createContact(values);
    if(status === 201){
      toast.success("مخاطب با موفقیت ساخته شد" )
      setContacts(draft=>{
        draft.push(data)
    })

      setFilteredContacts(draft=>{
        draft.push(data)
      })


      setLoading((prevLoading) => !prevLoading)
      navigate("/contacts");
    }
  } catch (error) {
    console.log(error.message);
    setLoading((prevLoading) => !prevLoading)
  }
}


const confirmDelete = (contactId , contactFullname) =>{
  confirmAlert({
    customUI : ({onClose}) =>{
      return(
        <div
        dir="rtl"
        style={{
          backgroundColor:CurrentLine,
          border:`1px solid ${Purple}`,
          borderRadius:"1em"
        }}
        className="p-4"
        >
          <h1 style={{color:Yellow}}>پاک کردن مخاطب</h1>
          <p
          style={{color:"white"}}
          > مطمینی که میخوای مخاطب { contactFullname} رو پاک کنی؟
          </p>

          <button
          className="btn mx-2" style={{backgroundColor:Purple}}
          onClick={()=>{
            removeContact(contactId);
            onClose()
          }}>
            مطمین هستم
          </button>

          <button className="btn" style={{backgroundColor:Comment}} onClick = {onClose}>انصراف</button>
        </div>
      )
    }
  }

  )
}

const removeContact = async (contactId)=>{
   //Contacts Copy
   const contactsBackup= [...contacts]
  try {

    //delete contact

    setContacts((draft)=>contacts.filter((c)=>c.id!==contactId))
    setFilteredContacts((draft)=>contacts.filter((c)=>c.id!==contactId))

    //sending request to server
    const {status} = await deleteContact(contactId);
    toast.error("مخاطب با موفقیت حذف شد")
    if (status !==200) {
      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup)
      
    }
  } catch (error) {
    console.log(error.message);
    setContacts(contactsBackup);
    setFilteredContacts(contactsBackup)
    
  }
}

const contactSearch =_.debounce(query =>{

  if(!query) return setFilteredContacts([...contacts])

  setFilteredContacts((draft)=>
  draft.filter((c)=>c.fullname.toLowerCase().includes(query.toLowerCase())))



},1000)




  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      setContacts,
      setFilteredContacts,
      contacts,
      filteredContacts,
      groups,
      deleteContact:confirmDelete,
      createContact:createContactForm,
      contactSearch,
    }}>
  <div className="App">
    <ToastContainer rtl={true} position="top-right" theme="colored"/>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/contacts/add" element={<AddContact/>}/>
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
            />
          }
        />
      </Routes>
    </div>
    </ContactContext.Provider>
  );
};


export default App;
