import Contact from "./Contact";
import Spinner from "../Spinner";
import {Pink,Orange, CurrentLine} from "../../helpers/colors";

const Contacts = ({contacts,loading}) =>{

    return(
        <>
        <section className="container">
            <div className="grid">
                <div className="row">
                    <div className="col">
                        <p className="h3">
                            <button className="btn mx-2" style={{backgroundColor: Pink}}>
                                ساخت مخاطب جدید
                                <i className="fa fa-plus-circle mx-2"/>
                            </button>
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
                        contacts.length > 0 ? contacts.map(c=> (
                            <Contact key={c.id} contact={c}/>
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