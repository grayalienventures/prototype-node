## Note configuration
make sure create file  /src/localConfig.js
configuration local react-app 
```diff
export default {
    endpoint: "http://web-server/",
    serverSocket: "http://socket-server:3000/",
    port:3000
}
```


# make sure install 
```diff
  npm install -g concurrently
  npm install -g nodemon
```

## run nodemon with build react 

```bash
 npm run start-build
```
## run node-js and build webpack ->  mode  production
```bash 
npm run start start-build-prod
```
## run node-js and build webpack ->  mode  development
```bash 
npm run start start-build-dev
```

## build webpack production
```bash 
npm run start webpack-prod
```
## build webpack development
```bash 
npm run start webpack-dev
