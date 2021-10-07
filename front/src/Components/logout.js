import React from 'react'

function logout(props) {

    return (
        <div>
            <h2>Bienvenue</h2>
            <br/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={props.resetAccount}>Se déconnecter</button>
        </div>
    )
}

export default logout
