import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/welcome.css';
import logoImg from '../assets/logo.svg';
import welcomeImg from "../assets/landing-ilustra.svg";

import Login from '../pages/Login';
import Register from '../pages/Register';
import '../styles/pages/welcome.css';


export default function Welcome() {
    return (
        <div id="page-welcome">     
        <img src={logoImg} alt="Happy"/>

            <section>
                <aside>
                    <img id="welcomeImg" src={welcomeImg} alt="" />                

                </aside> 

                <main>               

                    <header>
                        <legend>Welcome!</legend>
                    </header>

                    <Login />
                </main>

            </section>


  
        </div>
  
     
    )
}

