import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{

        const endpoint=`https://localhost:7214/Auth/login`;
        fetch(endpoint,
             {
             method:'POST',
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
             },
             body:JSON.stringify({userName: 'readwrite@user.com', password: 'Readwrite@user'})
             //body:JSON.stringify({userName: 'readwrite@user.com', password: 'Readwrite@user'})
            //  body:{'userName': 'readwrite@user.com',
            //  'password': 'Readwrite@user'}
             }).then(response=>response.json())
             .then(data=>{
                console.log(data);
             })
             .catch(error=>console.log(error))

    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}