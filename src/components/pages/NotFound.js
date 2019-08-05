import React from 'react'

export default function NotFound() {
  return (
    <div className="container mt-5">
        <div className="container">
            <h1 className="text-center" style={{textShadow: '0 1px 3px rgba(0,0,0,.5)',color: 'white'}}><span className="text-danger">404</span> Page Not Found!</h1>
        </div>
        <div className="jumbotron mt-5" style={{backgroundColor: '#3b3a30', textShadow: '0 1px 3px rgba(0,0,0,.5)', color: 'white'}}>
            <p className="font-weight-bold text-center h2">
            Oopsies, page you requested is not on the server.
            </p>
        </div>
    </div>
  )
}