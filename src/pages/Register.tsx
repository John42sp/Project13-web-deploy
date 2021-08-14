import React, { useState, FormEvent, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import api from '../services/api';
import PrimaryButton from "../components/PrimaryButton";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Formik, Field, Form, ErrorMessage } from 'formik';
//Formik library para aparecer menssagem de erro de input na Form, varios erros na implementação...

const userSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório.').max(60),
  email: Yup.string().required('Email obrigatório'),
  password: Yup.string().required('Senha obrigatória').min(4, 'Ops, curta demais.').max(10, 'Ops, longa demais.'), 
})

  function Register() {
  const history = useHistory(); 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [firstPassword, setFirstPassword] = useState('');  
    const [password, setPassword] = useState('');  
    
    const { register, handleSubmit, errors, getValues } = useForm();
    // const inputPassword = useRef(null)

      async function handleAddDev(e: FormEvent) {
     
          // e.preventDefault();
          let formData = {
            name,
            email,
            password,  
          }

          const isValid = await userSchema.isValid(formData);
          console.log(isValid);
          if(!isValid) {
            alert('Por favor, cadastre um email valido, e senha entre 4 e 10 caracteres!')

            setName('');
            setEmail('');
            setFirstPassword('');
            setPassword('');
          }

          if(firstPassword != password){
            alert('As duas senhas são diferentes. Tente denovo!')

            setName('');
            setEmail('');
            setFirstPassword('');
            setPassword('');
          }
          const response = await api.post('/users/new', formData)   
          console.log(response.data);
          alert('Cadastro efetuado com sucesso.')

          setName('');
          setEmail('');
          setFirstPassword('');
          setPassword('');
        
        history.push('/')
      }    

      interface MyFormValues {  //para o Formik
        name: string,
        email: string,
        firstPassword: string,
        password: string,
  }

      const myValues: MyFormValues = { //para o formik
        name: "",
        email: "",
        firstPassword: "",
        password: "",
      }


      
    return (
        <>       
        {/* validation with instant message using Formik*/}
        {/* <div id="register">          
           <strong>Cadastrar Usuário</strong>
           <Formik  
                initialValues={myValues}
                validationSchema={userSchema}
                onSubmit={handleAddDev}>
         
           <Form  >
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <Field 
                name="name" 
                id="name" 
                type="text"
                placeholder= "Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
                required />
              <ErrorMessage 
                name="name"
                component="div"
                className="invalid-feedback"
                style={{ color:"red", fontWeight:"bold"}}/>
            </div>
            
            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <Field
                name="email" 
                id="email" 
                type="email"
                placeholder= "Seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                 />
                <ErrorMessage 
                  name="email"
                  component="div"
                  className="invalid-feedback"
                  style={{ color:"red", fontWeight:"bold"}}/>
            </div>

            <div className="input-block">
              <label htmlFor="email">Senha</label>
              <Field
                name="password" 
                id="password" 
                type="text"
                placeholder= "Senha"
                value={firstPassword}
                onChange={e => setFirstPassword(e.target.value)}
                ref={register}/>
               <ErrorMessage 
                  name="password"
                  component="div"
                  className="invalid-feedback"
                  style={{ color:"red", fontWeight:"bold"}}/>
            </div>

            <div className="input-block">
              <label htmlFor="email">Confirmar Senha</label>
              <Field 
                name="passwordConfirmation" 
                id="password" 
                type="text"
                placeholder= "Confirme sua sehna"
                ref={register({
                  validate: {
                    passwordEqual: value => (value === getValues().password) || 'Password confirmation error!',
                  }
                })}                
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
                <ErrorMessage 
                  name="name"
                  component="div"
                  className="invalid-feedback"
                  style={{ color:"red", fontWeight:"bold"}}/>
                {errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}
            </div>                 

            <PrimaryButton type="submit">Cadastrar</PrimaryButton>  
          </Form>
          
          </Formik>
          <button><Link to='/'></Link> </button>             
       
        </div>    */}
          {/* validation and password confirmation  */}
         <div id="register">          
           <strong>Cadastrar Usuário</strong>
           <form onSubmit={handleSubmit(handleAddDev)}>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                name="name" 
                id="name" 
                placeholder= "Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
                required />
            </div>
            
            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input 
                name="email" 
                id="email" 
                placeholder= "Seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                 />
            </div>

            <div className="input-block">
              <label htmlFor="email">Senha</label>
              <input 
                name="password" 
                id="password" 
                placeholder= "Senha"
                value={firstPassword}
                onChange={e => setFirstPassword(e.target.value)}
                ref={register}
               />
            </div>

            <div className="input-block">
              <label htmlFor="email">Confirmar Senha</label>
              <input 
                name="passwordConfirmation" 
                id="password" 
                placeholder= "Confirme sua sehna"
                ref={register({
                  validate: {
                    passwordEqual: value => (value === getValues().password) || 'Password confirmation error!',
                  }
                })}                
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
                {errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}
            </div>                 

            <PrimaryButton type="submit">Cadastrar</PrimaryButton>  
          </form>
          <button><Link to='/'></Link> </button>             
       
        </div>            

        </>
    )
}

export default withRouter(Register);
