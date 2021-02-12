import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'

import HomeScreen from '../screens/HomeSceen'
import USignInScreen from '../screens/UserSignIn'
import USignUpScreen from '../screens/UserSignUp.js'
import RSignInScreen from '../screens/RecruiterSignIn'
import RSignUpScreen from '../screens/RecruiterSignUp'
import { CreatePost } from '../screens/CreateJob'
import Showjobs from '../screens/Showjobs'


const Routing = () => {

    return (
        <Switch>
            <Route exact path="/">
                <Showjobs />
                {/* <HomeScreen /> */}
            </Route>
            <Route path="/user/signup">
                <USignUpScreen />
            </Route>
            <Route path="/user/signin">
                <USignInScreen />
            </Route>
            <Route path="/recruiter/signup">
                <RSignUpScreen />
            </Route>
            <Route path="/recruiter/signin">
                <RSignInScreen />
            </Route>
            <Route path="/recruiter/postJob">
                <CreatePost />
            </Route>
            <Route path="/alljobs">
                <Showjobs />
            </Route>

        </Switch>
    )
}

const App = () => {


    return (
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    )
}

export default App
