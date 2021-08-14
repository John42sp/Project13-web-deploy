import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/welcome.css';
import logoImg from '../assets/logo.svg';
import Login from '../pages/Login';
import Register from '../pages/Register';
import '../styles/pages/welcome.css';


export default function Welcome() {
    return (
        <div id="page-welcome">     
        <img src={logoImg} alt="Happy"/>

            <section>
                <aside>
                <header>
                    <legend>Seja bem vindo!</legend>
                </header>
                    <Login />
                    {/* <Link to='/users/login'>Faca seu Login</Link> */}

                </aside> 


                <main>
                    <Register />
                    {/* <Link to='/users/new'>Faca seu cadastro</Link> */}

                </main>

            </section>


  
        </div>
  
     
    )
}

