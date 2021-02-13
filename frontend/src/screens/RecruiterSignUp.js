
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
const fetch = require('node-fetch');
const RSignUpScreen = () => {
    const history = useHistory()
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [designation, setdesignation] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setPhoneNo] = useState("");
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return;
        }
        console.log('Clicked')
        fetch('/recruiter/signUp', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, contact, company, designation
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                } else {
                    alert('Account Created')
                    history.push('/recruiter/signin')
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <div className="container" style={{ backgroundColor: 'whitesmoke', width: '50vw', marginTop: '10vh' }}>
                <h2>Register as a Recruiter</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="InputName" className="form-label">Name</label>
                        <input onChange={(e) => {
                            setName(e.target.value)
                        }} type="text" className="form-control" id="InputName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputCompany" className="form-label">Company</label>
                        <input onChange={(e) => {
                            setCompany(e.target.value)
                        }} type="text" className="form-control" id="InputCompany" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Inputdesignation" className="form-label">designation</label>
                        <input onChange={(e) => {
                            setdesignation(e.target.value)
                        }} type="text" className="form-control" id="Inputdesignation" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Inputemail" className="form-label">email address</label>
                        <input onChange={(e) => {
                            setemail(e.target.value)
                        }} type="email" className="form-control" id="Inputemail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} type="password" className="form-control" id="InputPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPhoneNo" className="form-label">PhoneNo</label>
                        <input onChange={(e) => {
                            setPhoneNo(e.target.value)
                        }} type="number" className="form-control" id="InputPhoneNo" />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        PostData()
                    }} type="submit" className="btn btn-primary">Submit</button><br />
                    <Link to="/recruiter/signin">Already have an account</Link>
                </form>
            </div>
        </>
    )
}

export default RSignUpScreen
