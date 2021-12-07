import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



export const PrivateRoute = ({ children, token, ...rest }) => {
  
    return (

        <Route {...rest} render={props => (
            token
                ? (
                    children
                )
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}


export default PrivateRoute;
