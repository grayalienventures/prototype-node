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

const RootApp = (props) => {
  let auth = useSelector(state => state.auth)
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
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/login" component={LoginScreen} />
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
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootApp />
      </PersistGate>
    </Provider>
  )
}

// use for development

export default hot(App);