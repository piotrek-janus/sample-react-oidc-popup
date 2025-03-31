import React, { useEffect, useState } from "react";
import { client } from "./oidc-settings";


export function PopupCallback() {
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