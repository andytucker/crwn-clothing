import { useState } from "react";
import './sign-up-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
  
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();

        } catch (error) {
            
        }
    
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value});
    };
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up Form</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName"  value={displayName} required onChange={handleChange}/>
                
                <FormInput label="Email" type="email"  name="email" value={email}required onChange={handleChange} />
                
                <FormInput label="Password" type="password"  name="password" value={password} required onChange={handleChange} />
                
                <FormInput label="Confirm Password" type="password"  name="confirmPassword" value={confirmPassword} required onChange={handleChange} />
                <Button type="submit" >Sign Up</Button>

            </form>
        </div>
    );
};

export default SignUpForm;