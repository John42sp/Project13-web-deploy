import React, { FormEvent, useState } from 'react';
import { Link, withRouter, useHistory } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import '../styles/pages/welcome.css';
import axios from 'axios';
import api from '../services/api';

 function ResendToken() {       
    const history = useHistory();

    const [email, setEmail] = useState('');
 
    async function handleResendToken(e: FormEvent) {
      e.preventDefault();    
        await api.post('/users/resendtoken', { email})
      alert(`A new verification email has been sent to ${email} mail box.`)
      history.push('/'); 
    
    }   
     
    return (
      <>     
        <div id="page-welcome" className="center">      
          <div id="forgotPass" >   
              <strong>New verification email</strong>
              <form onSubmit={handleResendToken}>                    
                <div className="input-block">
                  <label htmlFor="email">E-mail</label>
                  <input 
                    name="email" 
                    id="email" 
                    placeholder= "Your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                                                                  
                <PrimaryButton type="submit">Send</PrimaryButton>    

                <Link to="/" id="registerLink">Back to Login</Link>
            

              </form>  
              
          </div>       
          <Link to='/'></Link>      
        </div>       
      </>
    )
}


export default withRouter(ResendToken);