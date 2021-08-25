import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import '../styles/pages/landing.css';
import logoImg from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { getUser, setUserSession, removeUserSession, getToken } from "../services/auth";
import { useHistory } from 'react-router-dom';



export default function Landing() {
  const history = useHistory();

  const token = getToken();
  const user = getUser();
  // const { id } = user;
  // console.log(user);  
  // console.log(id)

  const goToOrphMap = () => {    
    setUserSession(token, user);
    history.push('/app');
  }  

  const logout = () => {    
    removeUserSession();
    history.push('/');
  }

  const changePassword = () => {    
    setUserSession(token, user);
    history.push('/users/changepass');
  }

    return (
        <div id="page-landing">      

        <div className="content-wrapper">
          <img src={logoImg} alt="Happy"/>
          
          <main>
            <h1>Take joy and happiness to the world</h1>
            <p>Visit orphanages and change the day of many kids. </p>
          </main>
  
          <div className="location">
            <strong>Baln. Camboriu</strong>
            <span>Santa Catarina</span>
          </div>
  
          <div className="enter-app">
            <button onClick={goToOrphMap} className="enter-app">
              <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
            </button>
          </div>

        <button onClick={changePassword} className="logout">Change Password</button>

        <button onClick={logout} className="logout">Logout</button>

  
        </div>
  
      </div>
    )
}

