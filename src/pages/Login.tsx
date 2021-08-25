import React, { FormEvent, useState } from 'react';
import { Link, withRouter, useHistory } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { setUserSession } from "../services/auth";
import '../styles/pages/welcome.css';
import api from '../services/api';

 function Login() {       
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleLogin(e: FormEvent) {
      e.preventDefault();    
      setError(null)
      try {
    
      const response = await api.post('/users/login', { email, password });       

      const { token, user } = response.data;    
      
      setUserSession(token, user);   // para salvar id do usuário no navegador
      history.push('/landing');        //executa a propriedade levando para a rota/pag. dashboard  
        
      } catch (error) {
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.status);     
          alert(error.response.status + " - " + error.response.data)
          setEmail('');
          setPassword('');

      } else if (error.request) {
        // console.log(error.request);
        alert(error.request)
      } else {
        // Something happened in setting up the request and triggered an Error
        // console.log('Error', error.message);
        alert(error.message)
      }         
    }   
  }
     
    return (
      <>        
        <div id="login">   
            <strong>Login</strong>
            <form onSubmit={handleLogin}>                    
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
              <div className="input-block">
                <label htmlFor="password">Password</label>
                <input 
                  name="password" 
                  id="password" 
                  placeholder= "Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required />
              </div>                                                         
              <PrimaryButton type="submit" >Enter</PrimaryButton>    

              <Link to='/users/new' id="registerLink" >Register</Link>
              
              <Link to="/users/forgotpass" id="forgotLink">Forgot password</Link>                       

            </form>  
            
        </div>       
        <Link to='/'></Link>             
      </>
    )
}


export default withRouter(Login);