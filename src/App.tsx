import React from 'react';
import { render } from 'react-dom';
import './styles/App.css';
import './styles/index.css';
import HomeScreen from './screens/HomeScreen';

import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import CustomNavbar from './components/CustomNavbar';
import Footer from './components/Footer';
import { Provider, connect, useSelector, useDispatch } from 'react-redux';

import store from './redux/store';
import { persistor } from './redux/store';
import Notfound from './components/Notfound';
import { hot } from 'react-hot-loader/root';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './routes/PrivateRoute';
import FrontEndScreen from './screens/FrontEndScreen';
const PGate = PersistGate as any
const RootApp = (props) => {
  // @ts-ignore
  let auth = useSelector(state => state?.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {

  }, [])
  return (
    <Router>
      <>
        <div className={""}>
          <div className="">
            <div>
              <div className={"content-wrap"}>
                <CustomNavbar />
                <div className="page-container  ">
                  <Switch>
                    <Route exact path="/" component={FrontEndScreen} />

                    <Route exact path="/login" component={LoginScreen} />
                    <PrivateRoute token={auth.token} path="/home">
                      <HomeScreen />
                    </PrivateRoute>
                    <PrivateRoute token={auth.token} path="/profile">
                      <ProfileScreen />
                    </PrivateRoute>
                    <Route component={Notfound} />
                  </Switch>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </>
    </Router>
  )
}




export const App = () => {
  // @ts-ignore
  return (
    <Provider store={store}>
      <PGate
        // @ts-ignore
        loading={null} persistor={persistor}>
        <RootApp />
      </PGate>
    </Provider>
  )
}

// use for development

export default hot(App);