import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { UserManager, UserManagerSettings, User } from 'oidc-client-ts';

function App() {


  const settings: UserManagerSettings = {
    authority: 'https://janus.eu.authz.cloudentity.io/janus/demo',
    client_id: '5db70ee5e0444f8f88b7acd396a685cc',
    redirect_uri: 'https://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid profile',
    automaticSilentRenew: true,
    response_mode: 'fragment',
    popup_redirect_uri: 'https://localhost:3000/callback',
    popup_post_logout_redirect_uri: 'https://localhost:3000/logoutCallback',
    silent_redirect_uri: 'https://localhost:3000/silentCallback',
    filterProtocolClaims: true
};

  const client = new UserManager(settings);
  const optionalArgs = { 
    state: { bar: 15 } 
  };

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    client.signinPopupCallback().then(function() {
      console.log("signin popup callback response success");
    }).catch(function(err) {
      console.error(err);
    });
  }, []);

  const login = () => {
    client.signinPopup(optionalArgs).then(function(user) {
      console.log("signed in", user);
      setUser(user);
    }).catch(function(err) {
      console.error(err);
    });
    return false;
  }

  const logout = () => {
    client.signoutPopup().then(function() {
      console.log("signed out");
      setUser(null);
    }).catch(function(err) {
      console.error(err); 
    });
    return false;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        { !user && <button onClick={login}>Login</button> }
        { user && <div>
          <p>Logged in as {user.profile.name}</p>
          <button onClick={logout}>Logout</button>
        </div> }
      </header>
    </div>
  );
}

export default App;
