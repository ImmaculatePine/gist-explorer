// User just came to the page of app
// App doesn't know who is it yet
export const AUTH_STATE_UNKNOWN = 'AUTH_STATE_UNKNOWN';

// User has no token or his token is invalid
// So, user acts as an unauthenticated guest
export const AUTH_STATE_GUEST = 'AUTH_STATE_GUEST';

// User has valid token and acts as an authenticated person
export const AUTH_STATE_AUTHENTICATED = 'AUTH_STATE_AUTHENTICATED';
