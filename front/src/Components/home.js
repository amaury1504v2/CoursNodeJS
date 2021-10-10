import React from 'react'
import Logout from './logout'
import ExercisesList from './exercise-list'

function home(props) {

console.log('home')

    return (
        <div>
            <ExercisesList />
            <Logout email={props.email} password={props.password} resetAccount={props.resetAccount}/>
        </div>
    )
}

export default home
