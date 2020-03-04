import React from 'react'
import { Route } from 'react-router-dom'

export default function ProtectedRoute({component : C, appProps, ...rest}) {
    return (
        <div>
        <Route {...rest} render={ props => appProps.loggedIn ? <C {...props} {...appProps}/> : <h3>Please Login First.</h3>}/>
        </div>
    )
}
