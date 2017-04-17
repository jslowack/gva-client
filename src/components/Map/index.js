import React, { Component } from 'react';
import MapView from './map-view';
import PeopleService from './../../services/people';

const INTERVAL_CHECK_NEW_USERS = 6*1000;
const INTERVAL_SWITCH_USERS = 5*1000;

export default class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [
      ],
      selectedUser: 0,
      center: this.getSelectedCenter()
    };
  }

  componentDidMount() {
    this.setUsers();

    this.checkNewUsersInterval();
    this.startMarkerRotation();
  }

  startMarkerRotation(){
    setInterval(() => {
      this.centerMarker();
    }, INTERVAL_SWITCH_USERS);
  }

  centerMarker(){
    const selected = Math.floor(Math.random() * this.state.users.length);
    let users = [... this.state.users];
    users[this.state.selectedUser]['classes'] = {active: false};
    users[selected]['classes'] = {active: true};
    console.log(selected);
    this.setState({selectedUser: selected, center: this.getSelectedCenter(), users });
  }

  getSelectedCenter() {
    if (!this.state || !this.state.users || this.state.users.length === 0) { return {lat: 59.95, lng: 30.33}; }
    const user = this.state.users[this.state.selectedUser];
    return  [user.lat, user.lng ];
  }

  checkNewUsersInterval(){
    setInterval(() => {
      this.checkNewUsers();
    }, INTERVAL_CHECK_NEW_USERS);
  }

  async checkNewUsers(){
    const users = await this.getUsers();
    if (users.length !== this.state.users.length){
      console.log("updating users");
      this.setState({ users });
    } else {
      console.log("no new users");
    }
  }

  async getUsers(){
    return await PeopleService.getUsers();
  }

  async setUsers(){
    const users = await this.getUsers();
    this.setState({ users });
  }

  render() {
    return (
      <MapView users={this.state.users} center={this.state.center}/>
    );
  }
}
