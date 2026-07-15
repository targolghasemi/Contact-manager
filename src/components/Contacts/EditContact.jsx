import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { getAllGroups, getContact, updateContact } from "../../services/contactService";
import {Spinner} from "../"
import{Comment , Orange , Purple} from "../../helpers/colors"

const EditContact = () =>{
    const {contactId} = useParams()
    const navigate = useNavigate()

    const[state,setState] = useState({
        loading:false,
        contact:{
            fullname: "",
            photo: "",
            mobile: "",
            email: "",
            job: "",
            group: "",
        },
        groups:[]
    });

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                setState({...state,loading:true});
                const {data:contactData} = await getContact(contactId)
                const {data:groupsData} = await getAllGroups();
                setState({
                    ...state,
                    loading:false,
                    contact:contactData,
                    groups:groupsData
                })
            } catch (error) {
                console.log(error);
                setState({...state,loading:false})
            }
        }

        fetchData();
    },[])

    const setContactInfo = (event)=>{
        setState({
            ...state,
            contact:{
                ...state.contact,
                [event.target.name]:[event.target.value]
            }
        })
    }

    const submitForm = async (event) =>{
        event.preventDefault();
        try {
            setState({...state,loading:true})
            const{data} = await updateContact(state.contact,contactId);
            setState({...state,loading:false})
            if (data) {
                navigate("/contacts")
            }
        } catch (error) {
            console.log(error);
            setState({ ...state, loading: false });
        }
    }

    const {loading,contact,groups} = state;
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
                                <div className="col-md-8">
                                    <form onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input
                                                name="fullname"
                                                type="text"
                                                className="form-control"
                                                value={contact.fullname}
                                                onChange={setContactInfo}
                                                required={true}
                                                placeholder="نام و نام خانوداگی"
                                            
                                            />
                                        </div>


                                        <div className="mb-2">
                                            <input
                                                name="mobile"
                                                type="number"
                                                className="form-control"
                                                value={contact.mobie}
                                                onChange={setContactInfo}
                                                required={true}
                                                placeholder="شماره موبایل"
                                            
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <input
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                value={contact.email}
                                                onChange={setContactInfo}
                                                required={true}
                                                placeholder="آدرس ایمیل"
                                            
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <input
                                                name="job"
                                                type="text"
                                                className="form-control"
                                                value={contact.job}
                                                onChange={setContactInfo}
                                                required={true}
                                                placeholder="شغل"
                                            
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <select
                                               name="group"
                                               value={contact.group}
                                               onChange={setContactInfo}
                                               required={true}
                                               className="form-control"
                                            >
                                                <option value="">انتخاب گروه</option>
                                                {groups.length > 0 && 
                                                  groups.map((group)=>(
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                  )) }
                                            </select>
                                        </div>

                                        <div className="mb-2">
                                            <input
                                            className="btn"
                                            type="submit"
                                            style={{backgroundColor:Purple}}
                                            value="ویرایش مخاطب"
                                            />
                                            <Link to={"/contacts"}
                                            className="btn mx-2"
                                            style={{backgroundColor:Comment }}>
                                                انصراف
                                            </Link>
                                        </div>

                                    </form>
                                </div>

                                <div className="col-md-4">
                                    <img
                                       src={contact.photo}
                                       className="img-fluid rounded"
                                       style={{border: `1px solid ${Purple}`}}
                                    />
                                </div>

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