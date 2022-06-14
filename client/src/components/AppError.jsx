import React from 'react'

const AppError = ({ text }) => {
    return (
        <div className="alert alert-danger show">{text}</div>
    )
}

export default AppError