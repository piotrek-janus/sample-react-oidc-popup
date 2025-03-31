import { UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client-ts';

export const settings: UserManagerSettings = {
    authority: 'https://janus.eu.authz.cloudentity.io/janus/demo',
    client_id: '5db70ee5e0444f8f88b7acd396a685cc',
    redirect_uri: 'https://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid profile',
    automaticSilentRenew: true,
    popup_redirect_uri: 'https://localhost:3000/popupCallback',
    popup_post_logout_redirect_uri: 'https://localhost:3000/logoutCallback',
    silent_redirect_uri: 'https://localhost:3000/callback',
    filterProtocolClaims: true,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  };

export const client = new UserManager(settings);