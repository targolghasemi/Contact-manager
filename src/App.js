import { useState , useEffect } from "react";
import {Routes,Route,Navigate,useNavigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import { AddContact,Contacts,EditContact,ViewContact } from "./components";

import {getAllContacts,getAllGroups , createContact} from "./services/contactService"

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [forceRender,setForceRender] = useState(false)
  const [getContacts, setContacts] = useState([]);
  const [getGroups,setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const navigate = useNavigate();

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


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts"/>}/>
        <Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading}/>}/>
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
        <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
      </Routes> 
    </div>
  );
};


export default App;
