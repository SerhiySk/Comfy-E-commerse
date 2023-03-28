import React from 'react';
// will remove later
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <h1>Loading...</h1>
      </div>
    ),
  });

  return <Component />;
};

export default PrivateRoute;
