import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';

import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import CustomNavbar from './CustomNavbar';
import Footer from './footer';
import { Provider, connect, useSelector, useDispatch } from 'react-redux';
import * as actions from './actions'
import { createStore } from 'redux'
import store from './store';
import {persistor} from './store';
import Notfound from './screens/notfound';


const Screens = (props) => {
    let auth = useSelector((state:any) => state.auth)
    const dispatch = useDispatch()

    React.useEffect(() => {
       
    }, [])
    return (
       <div>
                    <div className={"content-wrap"}>
                        <CustomNavbar />
                        <div className="page-container  ">
                            <Switch>
                                <Route exact path="/" component={App} />
                               

                                <Route component={Notfound} />
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </div>
    )
}


const InitApp = (props) => {
   
    return (
        <Router>
            <>
                <div className={""}>
                    <div className="">
                        <Switch>

                            <Screens {...props} />
                        </Switch>
                    </div>
                </div>
            </>
        </Router>
    )
}




const RouterApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <InitApp />
        </PersistGate>
    </Provider>
);

render(<RouterApp />, document.getElementById('root'));
