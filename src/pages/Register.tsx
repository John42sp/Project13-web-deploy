import React, { useState, FormEvent, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import api from '../services/api';
import PrimaryButton from "../components/PrimaryButton";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema = Yup.object().shape({
  name: Yup.string().min(5,'Hey, too short!').max(60,'Sorry, too long!').required('Name required.'),
  email: Yup.string().email('Please type a valid email.').required(),
  password: Yup.string().min(4,'Ops, too short!').max(15,'Ops, too long!').required('Password required'),
  passwordConfirmation: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value){
      return this.parent.password === value
    })
})

  function Register() {
  const history = useHistory(); 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [passwordConfirmation, setPasswordConfirmation] = useState('');  
  

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
      resolver: yupResolver(userSchema),
    });

      async function handleAddDev(e: FormEvent) {  
     
          // // e.preventDefault();
          let formData = {
            name,
            email,
            password
          }

          const response = await api.post('/users/new', formData)   
          console.log(response.data);
          alert('User successfully registered.')

          setName('');
          setEmail('');
          setPassword('');
          setPasswordConfirmation('');
        
        history.push('/')
        reset();
      }    

      
    return (
        <>       
          {/* validation and password confirmation  */}
        <div id="page-welcome" className="center">      

          <div id="register">          
            <strong>Member registration</strong>
            <form onSubmit={handleSubmit(handleAddDev)}>
              <div className="input-block">
                <label htmlFor="name">Name</label>
                <input 
                  {...register("name")}
                  name="name" 
                  id="name" 
                  placeholder= "Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  required 
                />
                <p className="yup-error">{errors.name?.message}</p>
              </div>
              
              <div className="input-block">
                <label htmlFor="email">E-mail</label>
                <input 
                  {...register("email")}
                  name="email" 
                  id="email" 
                  placeholder= "Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <p className="yup-error">{errors.email?.message}</p>
              </div>

              <div className="input-block">
                <label htmlFor="email">Password</label>
                <input 
                  {...register("password")}
                  name="password" 
                  id="password" 
                  placeholder= "Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  required
                />
                <p className="yup-error">{errors.password?.message}</p>
              </div>

              <div className="input-block">
                <label htmlFor="email">Confirm password</label>
                <input 
                  {...register("passwordConfirmation")}
                  name="passwordConfirmation" 
                  id="password" 
                  placeholder= "Repeat password"                        
                  value={passwordConfirmation}
                  onChange={e => setPasswordConfirmation(e.target.value)}
                  type="password"
                  required 
                  />
                  {errors.passwordConfirmation && <p className="yup-error" >{errors.passwordConfirmation.message}</p>}
              </div>                 

              <PrimaryButton type="submit">Register</PrimaryButton>  
            </form>
            <Link to='/' id="registerLink" >Back to login</Link>
            <Link to='/users/resendtoken' id="registerLink" >New verification email</Link>

            
        
          </div>     
        </div>       

        </>
    )
}

export default withRouter(Register);
