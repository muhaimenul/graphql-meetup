import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from '../pages/Auth'
import Events from '../pages/Events'
import Bookings from '../pages/Bookings'

export default class Routes extends Component {
    render() {
        return (

            <Switch>
                <Redirect from="/" to="/auth" exact/>

                <Route path="/auth" component={AuthPage} />
                <Route path="/events" component={Events} />
                <Route path="/bookings" component={Bookings} />
            </Switch>

        )
    }
}