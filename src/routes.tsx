import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';

import Orphanage from './pages/Orphanage';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateOrphanage from './pages/CreateOrphanage';
import ForgotPass from './pages/ForgotPass';
import ChangePassword from './pages/ChangePassword';
import ResendToken from './pages/ResendToken';


const isAuth = () => {
    if(localStorage.getItem('token')  !== null)  {
      return true;
    }
    return false;
  }
  
  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       isAuth() ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to={{ pathname: "/", state: { message: 'Usuário não autorizado' } }} />
  //       )
  //     }
  //   />
  // );

const Routes = () => (    
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Welcome}/>
                <Route path="/users/new" component={Register}/>
                <Route path="/users/login" component={Login}/>
                <Route path="/users/forgotpass" component={ForgotPass}/>
                <Route path="/users/resendtoken" component={ResendToken}/>

                
                {/* logged in */}
                <Route path="/landing" component={Landing}/>
                <Route path="/users/changepass" component={ChangePassword}/>

                <Route path="/app"  component={OrphanagesMap}/>
                <Route path="/orphanages/create"  component={CreateOrphanage}/>
                <Route path="/orphanages/:id"  component={Orphanage}/>                
            </Switch>
        </BrowserRouter>
    )


export default Routes;