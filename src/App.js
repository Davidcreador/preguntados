import React, { Component } from 'react';

// Firebase configuration
import firebaseApp from '../db';

import './App.css';

import {User} from './User';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      users: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  _getRef () {
    return firebaseApp.database().ref();
  }

  componentDidMount () {
    const userRef = this._getRef().child('users');
    userRef.once('value', function (snapshot) {
      snapshot.forEach((user) => {
        const storeUser = user.val();
        this.setState({ users: this.state.users.concat(storeUser) });
      });
    }.bind(this));
  }

  writeNewPost (username) {
    // A post entry.
    var user = {
      username: username,
      win: 0,
      lose: 0
    };

    // Get a key for a new Post.
    var newPostKey = this._getRef().child('users').push().key;

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

  render () {
    const users = this.state.users.length
      ? this.state.users.map((user, i) => {
        return <User key={i} userData={user} />;
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
              <a className='waves-effect waves-light btn'>button</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
