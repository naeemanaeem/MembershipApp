import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
//import {useHistory} from 'react-router-dom';

const clientId = "677448856451-tf822n4ctpqtrro55q55j400j6iv3gft.apps.googleusercontent.com";

function Login() {
 
  const [loading, setLoading] = useState('Loading...');
  const [user, setUser] = useState(null);

  //const history = useHistory();
 
  const handleLoginSuccess = async (response) => {
    try {
        setUser(response.profileObj);
         
        setLoading();

        const userData = {
            token: response.tokenId,
            googleId: response.profileObj.googleId,
            displayName: response.profileObj.name,
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            image: response.profileObj.image,
            email: response.profileObj.email
        };

        const res = await axios.post('/auth/google', userData);

        localStorage.user_displayName = res.data.displayName;
        localStorage.user_email = res.email;

        //history.push("/");
        // store returned user somehow
    } catch (error) {
        console.log(error);
    }
  }
 
  const handleLoginFailure = error => {
    console.log("Login Failure ", error);
    setLoading();
  }
 
  const handleLogoutSuccess = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user_displayName");
      await axios.delete('/auth/logout');
    } catch (error) {
      console.log(error);
    }
  }
 
  const handleLogoutFailure = error => {
    console.log("Logout Failure ", error);
  }
 
  const handleRequest = () => {
    setLoading("Loading...");
  }
 
  const handleAutoLoadFinished = () => {
    setLoading();
  }
 
  return (
    <Container className="col-lg-4 col-md-4 col-sm-4 justify-content-center">
    <br/>
      {user ? 
        <Card>
        <Card.Header>Welcome {user.name}!</Card.Header>
        <Card.Body><Card.Title>
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={handleLogoutSuccess}
          onFailure={handleLogoutFailure}
        />
        </Card.Title></Card.Body></Card>
      :
        <Card>
        <Card.Header>Login using your Google account</Card.Header>
        <Card.Body><Card.Title>
        <GoogleLogin
          clientId={clientId}
          buttonText={loading}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          onRequest={handleRequest}
          onAutoLoadFinished={handleAutoLoadFinished}
          isSignedIn={true}
        /></Card.Title></Card.Body></Card>}
    </Container>
  );
}

export default Login;