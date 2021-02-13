import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/App'
const HomeSceen = () => {
    const style = {
        margin: "0px 20px"
    }
    const RenderList = () => {
        const { state, dispatch } = useContext(UserContext)
        if (!state) {
            return [
                <p>Apply for job by regiestering <Link to="/user/signup">Here</Link></p>,
                <p>Post job by regiestering <Link to="/recruiter/signup">Here</Link></p>
            ]
        }

        return [<p>Apply for job <Link to="/alljobs">Here</Link></p>,
        <p>Post job <Link to="/recruiter/postJob">Here</Link></p>
        ]
    }
    return (
        <>
            <div className="container" style={{ width: '50vw', marginTop: '40vh' }}>
                <h2>Welcome</h2>
                <p>Check out all the Job Postings <Link to="/alljobs">here</Link> </p>
                {RenderList()}
            </div>
        </>
    )
}

export default HomeSceen
