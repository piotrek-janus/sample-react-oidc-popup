import { UserManager } from "oidc-client-ts";
import React, { useEffect, useState } from "react";
import { client } from "./oidc-settings";


export function LogoutCallback() {
    useEffect(() => {
        client.signoutSilentCallback().then(function() {
            console.log("silent signout callback response success");
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