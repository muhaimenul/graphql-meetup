import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from '../pages/Auth'

export default class Routes extends Component {
    render() {
        return (

            <Switch>
                <Redirect from="/" to="/auth" exact/>

                
                <Route path="/" component={null} />
                <Route path="/auth" component={AuthPage} />
                <Route path="/events" component={null} />
                <Route path="/bookings" component={null} />
            </Switch>

        )
    }
}