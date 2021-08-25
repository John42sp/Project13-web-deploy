import React, { FormEvent, useState } from 'react';
import { Link, withRouter, useHistory } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import '../styles/pages/welcome.css';
import axios from 'axios';
import api from '../services/api';
import { getUser } from "../services/auth";

 function HandleChange() {       
    const history = useHistory();

    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const user = getUser();
    // console.log(user.id)


    let userData = {
      password,
      newPassword
    }

    async function handleChange(e: FormEvent) {
      e.preventDefault();    

      // const response = await apiFile.post('orphanages/create', data, {
      //   headers: { user_id: user.id , user_name: user.name }
      //  // headers: { id }
      // });

      const response = await api.post('users/changepass', userData, {
        headers: { id: user.id }
      });
      console.log(response.data)
      alert(response.data)
      history.push('/landing'); 
    
    }   
     
    return (
      <>     
        <div id="page-welcome" className="center">      
          <div id="forgotPass" >   
              <strong>Change Password</strong>
              <form onSubmit={handleChange}>         

                {/* <div className="input-block">
                  <label htmlFor="email">E-mail</label>
                  <input 
                    name="email" 
                    id="email" 
                    placeholder= "Your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
                </div> */}

                <div className="input-block">
                  <label htmlFor="email">Password</label>
                  <input 
                    name="password" 
                    id="email" 
                    placeholder= "Your current password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
                </div>

                <div className="input-block">
                  <label htmlFor="email">New Password</label>
                  <input 
                    name="newPassword" 
                    id="email" 
                    placeholder= "Your new password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required />
                </div>
                                                                  
                <PrimaryButton type="submit">Send</PrimaryButton>    

                <a href="/landing" id="forgotLink">Exit</a>
            

              </form>  
              
          </div>       
          <Link to='/'></Link>      
        </div>       
      </>
    )
}


export default withRouter(HandleChange);