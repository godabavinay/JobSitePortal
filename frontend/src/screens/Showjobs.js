import React, { useState, useContext } from 'react'
import { UserContext } from '../components/App'
import { Redirect, useHistory } from 'react-router-dom'
const fetch = require('node-fetch')
const Showjobs = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [data, setData] = useState()
    fetch("/showjobs").then(res => res.json()).then((res) => { setData(res); })
    const PostData = (jobId, jobRole, company) => {
        if (!state) {
            return history.push('/user/signup')
        }
        fetch('/user/apply', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth": "user" + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                jobId
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.err)
                }
                else {
                    alert(`You have succesfuly applied for ${jobRole} at ${company}`)
                    history.push('/alljobs')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    if (!data) {
        return (<h1>Loading</h1>)
    }
    else {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Job Description</th>
                            <th scope="col">Total Applied</th>
                            <th scope="col">Easy Apply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data['allJobs'].map((i) => {
                            if (i.appliedList.includes(state ? state._id : '123')) {
                                return (
                                    <tr key={i._id} style={{ backgroundColor: 'green' }}>
                                        <th scope="col">{i.postedBy.company}</th>
                                        <th scope="col">{i.jobRole}</th>
                                        <th scope="col">{i.jobDescription}</th>
                                        <th scope="col">{i.appliedList.length}</th>
                                        <th scope="col">Already Applied</th>
                                    </tr>
                                )
                            } else return (
                                <tr key={i._id}>
                                    <th scope="col">{i.postedBy.company}</th>
                                    <th scope="col">{i.jobRole}</th>
                                    <th scope="col">{i.jobDescription}</th>
                                    <th scope="col">{i.appliedList.length}</th>
                                    <th onClick={(e) => {
                                        e.preventDefault();
                                        PostData(i._id, i.jobRole, i.postedBy.company)
                                    }} scope="col">Click to Apply</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Showjobs
