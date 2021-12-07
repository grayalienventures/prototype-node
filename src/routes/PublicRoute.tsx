import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'



export const PublicRoute = ({ children, token, ...rest }) => {
    let auth = useSelector(state => state.auth)
    return (<Route {...rest} render={props => (
        token
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            : (children)
    )} />)

}
export default PublicRoute;
