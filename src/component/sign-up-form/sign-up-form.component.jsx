import { useState } from "react";

import FormInput  from "../form-input/form-input-component";

import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFormAuth } from "../../utils/firebase/firebase.utils";


import "./sign-up-form.styles.scss";

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPasword:'',
}





const SignUpForm = () => {

    const [ formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPasword} = formFields;



    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


const handleSubmit = async (event) => {
    event.preventDefault();


    if(password !== confirmPasword ) {
        alert("password do not match");
        return;
    }
    try{
        const {user} = await createAuthUserWithEmailAndPassword (
            email, password);




        await createUserDocumentFormAuth(user, { displayName});

         resetFormFields();

    } catch (error){
        if(error.code === "auth/email-already-in-use" ){
            alert("Cannot create user, email already in use");
        } else{
            console.log("user creation encountered an error",error);


        }


    }
};



const handleChange = (event) => {

    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
};


    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                < FormInput  
                label="display name"
                    type = "text"
                    required 
                    onChange ={handleChange}
                     name = "displayName"
                      value = {displayName}
                    
                    />
                   

                <FormInput label="email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="password" type="password" required onChange={handleChange} name="password" value={password}/>

                <FormInput label="confirm password" type="password" required onChange={handleChange} name="confirmPassword"value={confirmPasword}/>

                
                <Button  type="submit">Sign Up</Button>
            
            </form>
        </div>
    );
};
export default SignUpForm;