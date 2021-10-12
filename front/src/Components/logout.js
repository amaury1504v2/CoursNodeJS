import React from 'react'

function logout(props) {

    return (
        <div>
            <h2>Bienvenue</h2>
            <button className="btn btn-outline-secondary my-3" type="button" id="button-addon2" onClick={props.resetAccount}>
                Se déconnecter
            </button>
        </div>
    )
}

export default logout
