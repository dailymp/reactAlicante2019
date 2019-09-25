# ReactAlicante2019 Demo


## Quick Start
1. Configure your React app in the Auth0 Dashboard.

2. Modify the .env file in the project root (same directory as package.json) that contains the following:

``` 
REACT_APP_AUTH0_DOMAIN=YOUR AUTH0 DOMAIN HERE
REACT_APP_AUTH0_CLIENT_ID=YOUR AUTH0 CLIENT ID HERE
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:3000/callback
```
3. If you want to integrate this app with an external API you should configure your API on Auth0 dashboard and then copy the enviroment variables
```
REACT_APP_AUTH0_AUDIENCE=http://yourapi.com
REACT_APP_API_URL=http://localhost:3001

```
4.  *Run the following:*
npm install
npm start
