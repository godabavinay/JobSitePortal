import React, { useState, useContext, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { UserContext } from '../components/App'
export const CreatePost = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [jobRole, setJobRole] = useState('')
    const [jobDescription, setjobDescription] = useState('')
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("user"))
        if (state) {
            if (state === 'USER') {
                history.push('/recruiter/signin')
            } else if (state === 'RECRUITER') {
                const recruiter = JSON.parse(localStorage.getItem("recruiter"))
                dispatch({ type: "RECRUITER", payload: recruiter })
            }
        }
    }, [])
    const PostData = () => {
        fetch('/recruiter/createJob', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth": "recruiter" + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                jobRole, jobDescription
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.err)
                }
                else {
                    history.push('/alljobs')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (<>
        <div className="container" style={{ backgroundColor: 'whitesmoke', width: '50vw', marginTop: '40vh' }}>
            <h2>Post a Job</h2>
            <form>
                <div className="mb-3">
                    <label for="jobRole" className="form-label">jobRole</label>
                    <input onChange={(e) => {
                        setJobRole(e.target.value)
                    }} type="text" className="form-control" id="jobRole" />
                </div>
                <div className="mb-3">
                    <label for="jobDescription" className="form-label">jobDescription</label>
                    <textarea onChange={(e) => {
                        setjobDescription(e.target.value)
                    }} type="text" className="form-control" id="jobDescription" />
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    PostData()
                }} type="submit" className="btn btn-primary">Create job position</button><br />
            </form>
        </div>
    </>)
}