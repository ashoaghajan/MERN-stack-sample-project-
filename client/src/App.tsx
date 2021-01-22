import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth/Auth';

function App() {

  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/auth' component={Auth}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
