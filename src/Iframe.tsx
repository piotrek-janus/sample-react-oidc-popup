import React, {useEffect} from "react";
import {User} from "oidc-client-ts";
import {client} from "./oidc-settings";

export function Iframe() {
    return (
        <div style={{width: "70%", marginTop: "20px"}}>
            <iframe src="https://localhost:3000/iframeLogin" style={{width: "100%", height: "100vh"}} />
        </div>
    )
}

export function IframeLogin() {
    useEffect(() => {
        client.signinRedirect({redirect_uri: "https://localhost:3000/iframeCallback"}).then((req) => {
            console.log("signinRedirect req", req);
        });
    }, []);
    
    return (
        <h2>Loading...</h2>
    );
    }

export function IframeCallback() {
    useEffect(() => {
        client.signinCallback(location.href).then((user: User | undefined) => {
            console.log("iframeSigninCallback user", user);
            window?.parent.postMessage({type: "oidc.user"}, "https://localhost:3000");
        }).catch(function(err) {
            console.error("failed to process signin response", err);
        });
    }, []);
    
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
}