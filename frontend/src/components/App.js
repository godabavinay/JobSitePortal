import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import HomeScreen from '../screens/HomeSceen'
import USignInScreen from '../screens/UserSignIn'
import USignUpScreen from '../screens/UserSignUp.js'
import RSignInScreen from '../screens/RecruiterSignIn'
import RSignUpScreen from '../screens/RecruiterSignUp'
import UserProflie from '../screens/UserProfile'
import { CreatePost } from '../screens/CreateJob'
import Showjobs from '../screens/Showjobs'
import { reducer, initialState } from '../reducers/reducer'
export const UserContext = createContext()
const Routing = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const recruiter = JSON.parse(localStorage.getItem("recruiter"))
        if (user || recruiter) {
            if (user) {
                dispatch({ type: "USER", payload: user })
            } else if (recruiter) {
                dispatch({ type: "RECRUITER", payload: recruiter })
            }
        }
    }, [])
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <HomeScreen />
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
                <Route path="/user/UserProflie">
                    <UserProflie />
                </Route>
            </Switch>
            <Signout /></>
    )
}

const Signout = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const recruiter = JSON.parse(localStorage.getItem("recruiter"))
        if (user || recruiter) {
            if (user) {
                dispatch({ type: "USER", payload: user })
            } else if (recruiter) {
                dispatch({ type: "RECRUITER", payload: recruiter })
            }
        }
    }, [])
    console.log(window.location.pathname)
    if (state) {
        return (<button style={{
            marginTop: '0px',
            marginLeft: '50vw'
        }} onClick={(e) => {
            e.preventDefault()
            localStorage.clear()
            dispatch({ type: "CLEAR" })
            history.push('/')

        }} type="button" class="btn btn-danger">Signout</button>)

    }
    else return (<button style={{
        marginTop: '0px',
        marginLeft: '50vw'
    }} onClick={(e) => {
        e.preventDefault()
        localStorage.clear()
        history.push('/')
    }} type="button" class="btn btn-success">Home</button>)
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App
