import { useState , useEffect } from "react";
import { Link , useParams} from "react-router-dom";
import { getGroup , getContact } from "../../services/contactService";
import Spinner from "../Spinner";
import { CurrentLine , Cyan , Purple } from "../../helpers/colors";

const ViewContact = () =>{
    const {contactId} = useParams();

    const[state,setstate] = useState({
        loading:false,
        contact:{},
        group:{},
    });

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                setstate({...state, loading:true});
                const {data:contactData} = await getContact(contactId);
                const {data:groupData} = await getGroup(contactData.group)

                setstate({
                    ...state,
                    loading:false,
                    contact:contactData,
                    group:groupData,
                })
            } catch (err) {
                console.log(err.message);
                setstate({...state,loading:false});
            }
        };

        fetchData();
    },[])

    const{loading , contact , group} = state

    console.log(contact);
    return(
      <>
         <section className="view-contact-intro p3">
            <div className="container">
                <div className="row my-2 text-center">
                    <p className="h3 fw-bold" style={{color:Cyan}}
                    >اطلاعات مخاطب
                    </p>
                </div>
            </div>
         </section>

         <hr style={{backgroundColor: Cyan}}></hr>

         {loading?(
            <Spinner/>
         ) : (
            <>
            {Object.keys(contact).length>0 &&(
                <section className="view-contact mt-e">
                <div className="container p-2" style={{borderRadius:"1rem",backgroundColor:CurrentLine}}>
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img
                            src={contact.photo}
                            alt=""
                            className="img-fluid rounded"
                            style={{border:`1px solid ${Purple}` }}
                            />
                        </div>
                        <div className="col-md-9">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی : {" "}
                                    <span className="fw-bold">{contact.fullname}</span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل : {" "}
                                    <span className="fw-bold">{contact.mobile}</span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    ایمیل : {" "}
                                    <span className="fw-bold">{contact.email}</span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    شغل : {" "}
                                    <span className="fw-bold">{contact.job}</span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    گروه : {" "}
                                    <span className="fw-bold">{getGroup.name}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <Link to={"/contacts"} className="btn" style={{backgroundColor:Purple}}>برگشت به صفحه اصلی </Link>
                        </div>
                    </div>
                </div>
            </section>
            )}  
            </>
         )}
      </>  
    );
};

export default ViewContact;