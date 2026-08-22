import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import Contact from "./Contact";
import Spinner from "../Spinner";
import {Pink,Orange, CurrentLine} from "../../helpers/colors";

const Contacts = () =>{
    const {contacts,loading,deleteContact,filteredContacts} = useContext(ContactContext);
    return(
        <>
        <section className="container">
            <div className="grid">
                <div className="row">
                    <div className="col">
                        <p className="h3 float-end">
                            <Link
                                to={"/contacts/add"}
                                className = "btn m-2"
                                style={{backgroundColor : Pink}}
                                >
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"/>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        {
            loading ? <Spinner/> : (
                <section className="container">
                <div className="row">
                    {
                        filteredContacts.length > 0 ? filteredContacts.map(c=> (
                            <Contact key={c.id} contact={c} deleteContact = {()=>  deleteContact(c.id , c.fullname)}/>
                        )) :
                        (
                            <div className="text-center py-5" style={{backgroundColor:CurrentLine}}>
                                <p className="h3" style={{color:Orange}}>
                                    مخاطب یافت نشد ...
                                </p> 
                                <img
                                 src={require("../../assets/no-found.gif")}
                                 alt="پیدا نشد"
                                 className="w-25"
                                  />
                                
                            </div>
                        )
                    }
                </div>
            </section>
            )
        }
        </>
    )
}

export default Contacts;