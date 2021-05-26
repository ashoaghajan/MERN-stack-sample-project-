import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/Posts/PostDetails';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector((state: RootState) => state.auth.authData);

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route exact path='/' component={() => <Redirect to='/posts' />} />
          <Route exact path='/posts' component={Home}/>
          <Route exact path='/posts/search' component={Home}/>
          <Route exact path='/posts/:id' component={PostDetails}/>
          <Route exact path='/auth' component={() => !user?.token ? <Auth/> : <Redirect to='/posts' />}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
