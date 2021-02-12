
import React, { useState } from 'react'
const fetch = require('node-fetch')
const Showjobs = () => {
    const [data, setData] = useState()
    fetch("/showjobs").then(res => res.json()).then((res) => { setData(res); })
    console.log(data);
    if (!data) {
        return (<h1>Loading</h1>)
    }
    else
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Job Description</th>
                            <th scope="col">Total Applied</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data['allJobs'].map((i) => {
                            return (
                                <tr>
                                    <th scope="col">{i.postedBy.company}</th>
                                    <th scope="col">{i.jobRole}</th>
                                    <th scope="col">{i.jobDescription}</th>
                                    <th scope="col">{i.appliedList.length}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
}

export default Showjobs
