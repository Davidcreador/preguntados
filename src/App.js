import React, { Component } from 'react';

// Firebase configuration
import firebaseApp from '../db';

import './App.css';

import {User} from './User';
import Jugar from './Jugar';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      users: [],
      questions: [],
      jugando: false,
      select: 0,
      user1: null,
      user2: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  _getRef () {
    return firebaseApp.database().ref();
  }

  componentDidMount () {
    var questionRef = this._getRef().child('questions');
    const userRef = this._getRef().child('users');
    userRef.once('value', function (snapshot) {
      snapshot.forEach((user) => {
        const storeUser = user.val();
        this.setState({ users: this.state.users.concat(storeUser) });
      });
    }.bind(this));

    questionRef.once('value', function (snapshot) {
      snapshot.forEach((question) => {
        this.setState({
          questions: this.state.questions.concat(question.val())
        });
      });
    }.bind(this));
  }

  writeNewPost (username) {
    // Get a key for a new Post.
    var newPostKey = this._getRef().child('users').push().key;

    // A post entry.
    var user = {
      username: username,
      win: 0,
      lose: 0,
      key: newPostKey
    };

    var updates = {};
    updates['/users/' + newPostKey] = user;

    return this._getRef().update(updates);
  }

  handleChange (inputName, event) {
    const userData = {};
    userData[inputName] = event.target.value;
    this.setState(userData);
  }

  handleSubmit (e) {
    e.preventDefault();
    const username = this.state.username.trim();
    this.writeNewPost(username);
  }

  selectUser (user) {
    if (this.state.select === 0) {
      this.setState({ user1: user, select: 1 });
    } else if (this.state.select === 1) {
      this.setState({user2: user, select: 2});
    }
  }

  render () {
    const users = this.state.users.length
      ? this.state.users.map((user, i) => {
        return <User
          selectUser={() => {
            this.selectUser(user);
          }}
          key={i}
          userData={user} />;
      })
      : null;
    return (
      <div className='App'>
        <div className='container'>
          <div className='row'>
            <div className='col s6'>
              <h2>Ranking</h2>
              {users}
            </div>
            <div className='col s6'>
              <h2>Crear jugador</h2>
              <div className='row'>
                <form
                  onSubmit={this.handleSubmit}
                  className='col s12'>
                  <div className='row'>
                    <div className='input-field col s12'>
                      <input
                        id='first_name'
                        type='text'
                        value={this.state.username}
                        onChange={(e) => {
                          this.handleChange('username', e);
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
              { (this.state.user1 && this.state.user2)
                ? <a
                  onClick={() => {
                    this.setState({ jugando: !this.state.jugando });
                  }}
                  className='waves-effect waves-light btn'>Jugar</a>
                : null }
            </div>
          </div>
        </div>
        { this.state.jugando
          ? <Jugar
            questions={this.state.questions}
            username1={this.state.user1}
            username2={this.state.user2} />
          : null }
      </div>
    );
  }
}

export default App;
