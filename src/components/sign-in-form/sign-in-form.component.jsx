import { useState } from "react";
import './sign-in-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";


import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: ''
  };


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
         
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();

        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                   alert('Wrong Password!');
                   break;
                case 'auth/user-not-found':
                    alert('No such user!');
                    break;
                default: console.log('err');
            } 
        }
    
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value});
    };
    return (
        <div className="sign-up-container">
            <h2>Alredy have an account?</h2>
            <span>Sign in please!</span>
            <form onSubmit={handleSubmit}>
                              
                <FormInput label="Email" type="email"  name="email" value={email}required onChange={handleChange} />
                
                <FormInput label="Password" type="password"  name="password" value={password} required onChange={handleChange} />
                <div className="buttons-container">

              
                <Button type="submit" >Sign In</Button>
                <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;