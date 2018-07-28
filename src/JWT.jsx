import React from 'react';
import JWTDecode from 'jwt-decode';

export const getJWT = () => {
  const raw = localStorage.getItem('JWT');
  if (raw) {
    const claims = JWTDecode(raw);
    if (new Date(claims.exp).getTime() >= Date.now()) {
      return claims;
    }
  }
  return null;
};

const { Provider, Consumer } = React.createContext({ JWT: null, setJWT: () => {} });

export { Provider as JWTProvider, Consumer as JWTConsumer };

export const withJWT = Component => props => (
  <Consumer>
    {JWTprops => <Component {...props} {...JWTprops} />}
  </Consumer>
);
