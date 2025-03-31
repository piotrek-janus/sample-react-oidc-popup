import { UserManager } from "oidc-client-ts";
import React, { useEffect, useState } from "react";
import { client } from "./oidc-settings";


export function LogoutCallback() {
    useEffect(() => {
        client.signinPopupCallback().then(function() {
            console.log("signin popup callback response success");
        }).catch(function(err) {
            console.error(err);
        });
    });
    
    return (
        <div>
        <h1>Loading...</h1>
        </div>
    );
}