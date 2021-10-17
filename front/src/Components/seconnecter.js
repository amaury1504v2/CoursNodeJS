import React from 'react'

function seconnecter(props) {
    return (
        <div className="border rounded p-3">
            {/* S'identifier */}
            <h2>S'identifier</h2>
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">@</span>
                <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" onChange={props.changeEmail}/>
            </div>
            <br/>
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">...</span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={props.changePassword}/>
            </div>
            <br/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={props.submit}>Se connecter</button>
        </div>
    )
}

export default seconnecter
