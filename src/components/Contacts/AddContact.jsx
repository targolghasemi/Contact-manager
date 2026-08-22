import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Formik, Form, Field, ErrorMessage } from "formik";

import {contactSchema} from "../../validations/contactValidation"
import Spinner from "../Spinner"
import { Green , Comment , Purple } from "../../helpers/colors"
import { values } from "lodash";
const AddContacts = () =>{
    const {loading,groups,createContact} = useContext(ContactContext)


    return(
        <>
         {loading ? (
        <Spinner />
      ) : (
        <>
        <section className="p-3">
            <img
               src={require("../../assets/man-taking-note.png")}
               height = "500px"
               style={
                {
                    position:"absolute",
                    zIndex:"-1",
                    top: "130px",
                    left: "100px",
                    opacity: "50%",
                }
               }
            />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p 
                        className="h4 fw-bold text-center"
                        style={{color:Green}}
                        >ساخت مخاطب جدید
                        </p>
                    </div>
                </div>
                <hr style={{backgroundColor:Green}}></hr>
                <div className="row mt-5">
                    <div className="col-md-4">
                       {/* {errors?.map((error,index)=>(
                            <p key={index} className="text-danger">{error.message}</p>
                       ))}*/}
                       <Formik
                          initialValues={{
                            fullname:'',
                            photo:'',
                            mobile:'',
                            email:'',
                            job:'',
                            group:'',
                          }}
                          validationSchema={contactSchema}
                          onSubmit={(values) =>{
                          createContact(values)
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
                                    classname="btn"
                                    style={{backgroundColor:Purple}}
                                    value="ساخت مخاطب"
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
                </div>


            </div>

        </section>

        </>
      )}


        
        </>

    )
}

export default AddContacts