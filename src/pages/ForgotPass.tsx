import React, { FormEvent, useState } from 'react';
import { Link, withRouter, useHistory } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import '../styles/pages/welcome.css';
import axios from 'axios';
import api from '../services/api';

 function ForgotPass() {       
    const history = useHistory();

    const [email, setEmail] = useState('');
 
    async function handleForgot(e: FormEvent) {
      e.preventDefault();    
         await api.post('/users/forgotpass', { email})
      alert('A new password has been sent to your mail box.')
      history.push('/'); 
    
    }   
     
    return (
      <>     
        <div id="page-welcome" className="center">      
          <div id="forgotPass" >   
              <strong>Password recovery</strong>
              <form onSubmit={handleForgot}>                    
                <div className="input-block">
                  <label htmlFor="email">E-mail</label>
                  <input 
                    name="email" 
                    id="email" 
                    placeholder= "Your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
                </div>
                                                                  
                <PrimaryButton type="submit">Send</PrimaryButton>    

                <a href="/" id="forgotLink">Back to Login</a>
            

              </form>  
              
          </div>       
          <Link to='/'></Link>      
        </div>       
      </>
    )
}


export default withRouter(ForgotPass);