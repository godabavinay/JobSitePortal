import React from 'react'

export const CreatePost = () => {
    return (<>
        <div className="container" style={{ backgroundColor: 'whitesmoke', width: '50vw', marginTop: '40vh' }}>
            <h2>Post a Job</h2>
            <form>
                <div className="mb-3">
                    <label for="jobRole" className="form-label">jobRole</label>
                    <input type="text" className="form-control" id="jobRole" />
                </div>
                <div className="mb-3">
                    <label for="jobDescription" className="form-label">jobDescription</label>
                    <textarea type="text" className="form-control" id="jobDescription" />
                </div>
                <button type="submit" className="btn btn-primary">Create job position</button><br />
            </form>
        </div>
    </>)
}