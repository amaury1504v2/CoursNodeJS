import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import Spinner from './spinner';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      loadingExercise: true,
      loadingUser: true
    }
  }

  componentDidMount() {
    const  id  = useParams
    let idExercises = window.location.href.substr(28)
    console.log(id)
    console.log(idExercises)
    
    this.chargementExercice(idExercises)
    this.chargementUser()

  }

  chargementExercice = async (idExercises) => {
    this.setState({loadingExercise: true})
    await axios.get('http://localhost:3000/exercises/'+idExercises, 
    {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    })
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
          loadingExercise: false
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  chargementUser = async () => {
    this.setState({loadingUser: true})
    console.log(window.localStorage.getItem('token'))
    await axios.get('http://localhost:3000/user/',
    {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    })
    
    .then(response => {
      if (response.data.length > 0) {
        let userList = []
        response.data.forEach(r => {userList.push(r.name)})
        this.setState({users: userList, loadingUser: false})
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    let idExercises = window.location.href.substr(28)

    axios.post('http://localhost:3000/exercises/update/' + idExercises, exercise,
    {
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    })
      .then(res => console.log(res.data));

    window.location = '/';
  }

  chargementAxios(){

  }

  render() {
    const {
      loadingExercise,
      loadingUser
    } = this.state
    return (
    <div class="container">
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Nom d'utilisateur: </label>
          { loadingUser ? <Spinner /> : 
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
            </select> }
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          { loadingExercise ? <Spinner /> :
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />}
        </div>
        <div className="form-group">
          <label>Durée (minutes): </label>
          { loadingExercise ? <Spinner /> :
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />}
        </div>
        <div className="form-group">
          <label>Date: </label>
          { loadingExercise ? <Spinner /> :
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>}
        </div>

        <div className="form-group">
          <input type="submit" value="Modifier le journal d'activité" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
