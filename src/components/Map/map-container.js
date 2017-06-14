import React, { Component } from 'react';
import MapComponent from './map-component';
import PeopleService from './../../services/people';
import {getQueryParams} from './../../utils/query-string';

const INTERVAL_CHECK_NEW_USERS = 6*1000;
const INTERVAL_SWITCH_USERS = 5*1000;

export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.usersNew = [];
    this.userIndexCurrent = 0;
    this.userIndex = 0;
    const params = getQueryParams();
    this.url = (params.url) ? params.url : 'bit.ly/GastvrijAntwerpen';
    this.state = {
      users: [],
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
    let users = [...this.state.users];
    if (users.length < 1) return; 
    
    let selected = 0;
    if (this.usersNew.length > 0){
      selected = users.length - this.usersNew.length;
      this.usersNew.shift(); 
    } else {
      selected = this.userIndex = (this.userIndex + 1 ) % users.length
    }
    
    this.centerUser(users, selected);
  }

  centerUser(users, selected) {
    console.log(selected, this.userIndexCurrent)
    users[this.userIndexCurrent]['classes'] = {active: false};
    users[selected]['classes'] = {active: true};
    this.userIndexCurrent = selected;
    console.log('centerUsers', users);
    this.setState({center: this.getSelectedCenter(), users });
  }

  getSelectedCenter() {
    if (!this.state || !this.state.users || this.state.users.length === 0) { return {lat: 59.95, lng: 30.33}; }
    const user = this.state.users[this.userIndexCurrent];
    return  [user.lat, user.lng ];
  }

  checkNewUsersInterval(){
    setInterval(() => {
      this.checkNewUsers();
    }, INTERVAL_CHECK_NEW_USERS);
  }

  async checkNewUsers(){
    const users = await this.getUsers();
    const currentAmount = this.state.users.length;
    if (users.length !== currentAmount){
      console.log("updating users");
      if((users.length > currentAmount)) {
        this.usersNew = this.usersNew.concat(users.slice(currentAmount));
      }
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
      <MapComponent url={this.url} users={this.state.users} center={this.state.center}/>
    );
  }
}
