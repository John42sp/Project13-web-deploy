import React, { FormEvent, useState } from 'react';
import { Link, withRouter, useHistory } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { setUserSession } from "../services/auth";
import '../styles/pages/welcome.css';
import axios from 'axios';

 function Login() {       
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleLogin(e: FormEvent) {
      e.preventDefault();    
      setError(null)
          await axios.post('http://localhost:3333/users/login', { email, password })//fazer chamada na api
      .then(response => {
      const { token, user } = response.data;    
      // console.log(response.data);    
      
      setUserSession(token, user);   // para salvar id do usuário no navegador
      history.push('/landing');        //executa a propriedade levando para a rota/pag. dashboard  
      })      
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
                  placeholder= "Seu email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required />
              </div>
              <div className="input-block">
                <label htmlFor="password">Senha</label>
                <input 
                  name="password" 
                  id="password" 
                  placeholder= "Sua senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required />
              </div>                                                         
              <PrimaryButton type="submit" >Entrar</PrimaryButton>    

              <a href="/users/forgotpass" id="forgotLink">Esqueci a senha</a>
          

            </form>  
            
        </div>       
        <Link to='/'></Link>             
      </>
    )
}


export default withRouter(Login);