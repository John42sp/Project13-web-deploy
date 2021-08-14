import React, { FormEvent, useState } from 'react';
import { Link, withRouter, useHistory } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import '../styles/pages/welcome.css';
import axios from 'axios';

 function ForgotPass() {       
    const history = useHistory();

    const [email, setEmail] = useState('');
 

    async function handleForgot(e: FormEvent) {
      e.preventDefault();    
      await axios.post('http://localhost:3333/users/forgotpass', { email})
      history.push('/'); 
    
    }   
     
    return (
      <>     
        <div id="page-welcome" className="center">      
          <div id="forgotPass" >   
              <strong>Recuperação de Senha</strong>
              <form onSubmit={handleForgot}>                    
                <div className="input-block">
                  <label htmlFor="email">E-mail</label>
                  <input 
                    name="email" 
                    id="email" 
                    placeholder= "Seu email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
                </div>
                                                                  
                <PrimaryButton type="submit">Enviar</PrimaryButton>    

                <a href="/" id="forgotLink">Voltar ao Login</a>
            

              </form>  
              
          </div>       
          <Link to='/'></Link>      
        </div>       
      </>
    )
}


export default withRouter(ForgotPass);