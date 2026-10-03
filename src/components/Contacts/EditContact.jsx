import { useEffect, useContext} from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import{Formik,Field,Form,ErrorMessage} from "formik"
import { useImmer } from "use-immer";
import {toast} from 'react-toastify'
import { ContactContext } from "../../context/contactContext";
import { getAllGroups, getContact, updateContact } from "../../services/contactService";
import {Spinner} from "../"
import{Comment , Orange , Purple} from "../../helpers/colors";
import { contactSchema } from "../../validations/contactValidation";

const EditContact = () =>{
    const {contactId} = useParams()
    const{setContacts,setFilteredContacts ,loading,setLoading,groups} = useContext(ContactContext)
    const navigate = useNavigate()

    const[contact,setContact] = useImmer({
        contact:{},
    });

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const {data:contactData} = await getContact(contactId)
                setLoading(false);
                setContact(contactData)
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchData();
    },[])

    const submitForm = async (values) =>{
        
        try {
            setLoading(true)
            const{data , status} = await updateContact(values,contactId);
            if (status === 200) {
                toast.info("مخاطب با موفقیت ویرایش شد")
                setLoading(false)
                
                setContacts(draft =>{
                    const contactIndex = draft.findIndex((c) => c.id === parseInt(contactId));
                    draft[contactIndex] = {...data}
                })
                setFilteredContacts(draft =>{
                    const contactIndex = draft.findIndex((c) => c.id === parseInt(contactId));
                    draft[contactIndex] = {...data}
                })
                          

                navigate("/contacts")
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return(
        <>
            {loading?(
                <Spinner/>
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{color:Orange}}>ویرایش مخاطب</p>
                                </div>
                            </div>
                            <hr style={{backgroundColor : Orange}}/>
                            <div className="row p-2 w-75 mx-auto align-items-center"
                            style={{backgroundColor:"#44475a", borderRadius:"1rem"}}>
                                <div className="col-md-8"/>
                                <Formik
                                initialValues={contact}
                                enableReinitialize={true}
                                validationSchema={contactSchema}
                                onSubmit={(values) =>{
                                submitForm(values)
                              }}
                            >
                                <Form >
                                <div className="mb-2">
                                    <Field
                                    name="fullname"
                                    type="text"
                                    className="form-control"
                                    placeholder="نام و نام خانوادگی"
                                    //required={true}
                                    />
                                    <ErrorMessage  name="fullname" render={(msg)=>(<div className ="text-danger">{msg}</div>)}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    name="photo"
                                    type="text"
                                    className = "form-control"
                                    placeholder="آدرس تصویر"
                                    //required = {true}
                                    />
                                    <ErrorMessage name="photo" render={(msg)=>(<div className ="text-danger">{msg}</div>)}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    name="mobile"
                                    type="number"
                                    className = "form-control"
                                    placeholder="شماره موبایل"
                                   // required = {true}
                                    />
                                    <ErrorMessage  name="mobile" render={(msg)=>(<div className ="text-danger">{msg}</div>)}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    name="email"
                                    type="email"
                                    className = "form-control"
                                    placeholder="آدرس ایمیل"
                                   // required = {true}
                                    />
                                    <ErrorMessage name="email" render={(msg)=>(<div className ="text-danger">{msg}</div>)}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    name="job"
                                    type="text"
                                    className = "form-control"
                                    placeholder="شغل"
                                   // required = {true}
                                    />
                                    <ErrorMessage name="job" render={(msg)=>(<div className ="text-danger">{msg}</div>)}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    name="group"
                                    as="select"
                                   // required={true}
                                    className="form-control"
                                    >
                                        <option value="">انتخاب گروه</option>
                                        {groups.length>0 &&
                                         groups.map((group) => (
                                            <option key={group.id} value={group.id}>
                                              {group.name}
                                            </option>
                                          ))}
                                    </Field>
                                    <ErrorMessage name="group" render={(msg)=>(<div className ="text-danger">{msg}</div>)}/>
                                </div>
                                <div className="mx-2">
                                    <input
                                    type="submit"
                                    className="btn"
                                    style={{backgroundColor:Purple}}
                                    value="ویرایش مخاطب"
                                    />
                                    <Link
                                    to="/contacts"
                                    className="btn mx-2"
                                    style={{backgroundColor:Comment}}
                                    >
                                        انصراف
                                    </Link>
                                </div>
                            </Form>
                       </Formik>
                        
                                </div>

                                <div className="text-center mt-4" >
                                    <img
                                       src={contact.photo}
                                       className="img-fluid rounded mt-4"
                                       style={{border: `1px solid ${Purple}`}}
                                    />
                                </div>

                            </div>

                        <div className="text-center mt-1">
                           <img
                              src={require("../../assets/man-taking-note.png")}
                              height="300px"
                              style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact;