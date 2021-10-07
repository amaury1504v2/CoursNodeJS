import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './spinner'


const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edite/"+props.exercise._id} style={{ color: 'green' }}>modifier</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }} style={{ color: 'red' }}>supprimer</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: [], loadingActivity: true};
  }



  componentDidMount() {
    this.chargementExercice()
  }

  chargementExercice = async () => {
    this.setState({loadingActivity: true})
    await axios.get('http://localhost:3000/exercises/',
    {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    })
      .then(response => {
        this.setState({ exercises: response.data, loadingActivity: false })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:3000/exercises/'+id,
    {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    })
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    const {
      loadingActivity
    } = this.state
    return (
      <div>
        <h3>Activités</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nom d'utilisateur</th>
              <th>Description</th>
              <th>Durée</th>
              <th>Date</th>
              <th>Activités</th>
            </tr>
          </thead>
          <tbody>
            { loadingActivity ? <Spinner /> : this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}