import React, { useEffect, createContext, useReducer, useContext } from 'react'

import { Link, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../components/App'
const UserProflie = () => {
    const style = {
        margin: "0px 20px"
    }
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
                history.push('/recruiter/profile')
            } else {
                return <Redirect to="/" />
            }
        }
    }, [])
    return (
        <>
            <div className="container" style={{ width: '50vw', marginTop: '40vh' }}>
                <h2>Welcome {state ? state.name : 'Stranger'}</h2>
                <p>Check out all the Job Postings <Link to="/alljobs">here</Link> </p>
            </div>
        </>
    )

}

export default UserProflie
