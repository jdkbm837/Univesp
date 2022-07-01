import React, { useContext } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import { AuthContext } from './app/Context/auth.jsx';

/* Paginas */
import Site from './site/site.jsx';
import Login from './app/Login/login';
import NovaConta from './app/NovaConta/novaconta';
import ResetSenha from './app/ResetSenha/resetsenha';
import Home from './app/Home/home';
import NovoAluno from './app/NovoAluno/novoaluno';
import EditarAluno from './app/EditarAluno/editaraluno';


function App(){
    const {logado} = useContext(AuthContext);

    function SecureRoute({...params}){
      if (!logado){
        return <Redirect to="/app" />
      } else {
      return <Route {...params} />
      }
    }
    
    return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Site} />    
      <Route exact path='/app' component={Login} />    
      <Route exact path='/app/novaconta' component={NovaConta} />    
      <Route exact path='/app/resetsenha' component={ResetSenha} />    

      <SecureRoute exact path='/app/home' component={Home} />    
      <SecureRoute exact path='/app/novoaluno' component={NovoAluno} />
      <SecureRoute exact path='/app/editaraluno/:id' component={EditarAluno} />
      </Switch>
    </BrowserRouter>;
  }
 
export default App;