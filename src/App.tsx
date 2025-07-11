import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from 'oidc-client-ts';
import {
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import { Iframe, IframeCallback, IframeLogin } from './Iframe';
import { PopupCallback } from './Popup';
import { LogoutCallback } from './Logout';
import { client } from './oidc-settings';

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    window.addEventListener('message', function(event) {
      if (event.data.type && event.data.type === "oidc.user") {
        console.log("message received", event);
        client.getUser().then(function(user) {
          console.log("user", user);
          setUser(user);
          navigate("/");
        });
      }
    });
    client.getUser().then(function(user) {
      console.log("user", user);
      setUser(user);
    }).catch(function(err) {
      console.error(err);
    });
  }, []);

  const login = () => {
    client.signinPopup().then(function(user) {
      console.log("signed in", user);
      setUser(user);
    }).catch(function(err) {
      console.error(err);
    });
    return false;
  }

  const logout = () => {
    client.signoutSilent({extraQueryParams: {redirect_to: "https://localhost:3000/logoutCallback"}}).then(function() {
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
          { !user && <div>
            <button onClick={login}>Login</button>
            <Link to="../iframe"><button>Login iframe</button></Link>
          </div> }
          <Routes>
            <Route path="/logoutCallback" element={<LogoutCallback />} />
            <Route path="/popupCallback" element={<PopupCallback />} />
            <Route path="/iframeCallback" element={<IframeCallback />} />
            <Route path="/iframeLogin" element={<IframeLogin />}/>
            <Route path="/iframe" element={<Iframe />}/>
            <Route path="/" element={ user && <LoggedIn user={user} logout={logout} />} />
          </Routes>
        </header>
      </div>
  );
}

interface LoggedInProps {
  user: User;
  logout: () => void;
}

const LoggedIn = (props: LoggedInProps) => {
  const [hello, setHello] = useState("");
  const style: any = {fontSize: "0.4em", border: "solid thin white", padding: "5px", textAlign: "left", background: "black"}
  const callResourceServer = async () => {
    const url = "http://localhost:7777/hello";
    const token = props.user.access_token;
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    setHello(JSON.stringify(await resp.json(), null, 2));
    
  }

  return (
    <div>
      <p>Logged in as {props.user.profile?.name}</p>
      <button onClick={props.logout}>Logout</button>
      <button onClick={callResourceServer}>Say Hello!</button>
      {hello && <pre style={style}>{hello}</pre>}
    </div>
  );
}

export default App;
