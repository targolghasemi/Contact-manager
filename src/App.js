import { useState , useEffect } from "react";
import {Routes,Route,Navigate,useNavigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import { confirmAlert } from "react-confirm-alert";
import { AddContact,Contacts,EditContact,ViewContact } from "./components";
import { CurrentLine, Purple , Yellow,Comment } from "./helpers/colors";

import {getAllContacts,getAllGroups , createContact,deleteContact} from "./services/contactService"

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [forceRender,setForceRender] = useState(false)
  const [getContacts, setContacts] = useState([]);
  const [getFilteredContacts,setFilteredContacts] = useState([])
  const [getGroups,setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const [query,setQuery] = useState({text:""});

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

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        setLoading(true);
        const { data : contactsData} = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        console.log(contactsData);
        setContacts(contactsData);
        setContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      }catch(err){
        
        setLoading(false)
      }
    }
    fetchData();
  },[forceRender])


const createContactForm = async (event) =>{
  event.preventDefault();
  try {
    const {status} = await createContact(getContact);
    if(status === 201){
      setContact({})
      setForceRender(!forceRender)
      navigate("/contacts");
    }
  } catch (error) {
    console.log(error.message);
  }
}

const setContactInfo = (event) =>{
  setContact({
    ...getContact,
    [event.target.name] : event.target.value,
  });
}

const confirm = (contactId , contactFullname) =>{
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
  try {
    setLoading(true);
    const response = await deleteContact(contactId);
    if (response) {
      const {data:contactsData} = await getAllContacts();
      setContacts(contactsData);
      setLoading(false)
    }
  } catch (error) {
    console.log(error.message);
    setLoading(false);
  }
}

const contactSearch = (event) =>{
  setQuery({...query,text:event.target.value});
  const allContacts = getContacts.filter((contact) =>{
    return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())

  });
  setFilteredContacts(allContacts)
}




  return (
    <div className="App">
      <Navbar query={query} search={contactSearch}/>
      <Routes>
        <Route path="/" element={<Navigate to="/contacts"/>}/>
        <Route path="/contacts" element={<Contacts contacts={getFilteredContacts} loading={loading} confirmDelete = { confirm}/>}/>
        <Route
          path="/contacts/add"
          element={
            <AddContact
            loading={loading}
            contact={getContact}
            groups={getGroups}
            setContactInfo={setContactInfo}
            createContactForm={createContactForm}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContact/>}/>
        <Route path="/contacts/edit/:contactId" element={<EditContact forceRender={forceRender} setForceRender={setForceRender}/>}/>
      </Routes> 
    </div>
  );
};


export default App;
