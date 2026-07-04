import Contact from "./Contact";
import Contacts from "./Contacts";

<div className="row">
    {
        Contacts.length >0 ? Contacts.map(c = >{
            <Contact />
        })
    }
</div>