import React, { useState, useContext, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { UserContext } from '../components/App'
const fetch = require('node-fetch')
const RSignInScreen = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const postData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return
        }
        fetch('/recruiter/signIn', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    localStorage.clear();
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.recruiter))
                    dispatch({ type: "RECRUITER", payload: data.recruiter })
                    history.push('/')
                }
            })
            .catch((err) => console.log(err))

    }
    if (!state || state === 'USER')
        return (
            <>
                <div className="container" style={{ backgroundColor: 'whitesmoke', width: '50vw', marginTop: '40vh' }}>
                    <h2>Login as a Recruiter</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="InputEmail" className="form-label">Email address</label>
                            <input value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputPassword" className="form-label">Password</label>
                            <input value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} type="password" className="form-control" id="InputPassword" />
                        </div>
                        <button onClick={(e) => { e.preventDefault(); postData() }} type="submit" name="action" className="btn btn-primary">Submit</button><br />
                        <Link to="/recruiter/signup">Dont have an account</Link>
                    </form>
                </div>
            </>
        )
    else return <Redirect to='/recruiter/postJob/' />

}

export default RSignInScreen
