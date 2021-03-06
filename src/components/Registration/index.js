import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { Button } from 'react-bootstrap';
import Modal from './../Modal';
import PeopleService from './../../services/people';
import WelcomeImage from './welcome.jpg';
import './style.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.onChange = this.onChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  getInitialState() {
    return { address: '', name: '', email: '', imageValue: '', image: null, showModal: false };
  }

  reset() {
    this.setState(this.getInitialState());
  }

  openModal() {
    this.setState({ showModal: true });
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(this.state);

    this.setState({
      [name]: value
    });
  }

  onFileChange(event) {
    this.setState({
      imageValue: event.target.value,
      image: (event.target.files && event.target.files.length > 0) ? event.target.files[0] : null
    })
  }

  onAddressChange(value) {
    this.setState({
      address: value
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (!this.state.name || !this.state.address) {
      return;
    }
    console.log(this.state);
    this.openModal();

    geocodeByAddress(this.state.address, (err, latLng) => {
      if (err) { console.log('Oh no!', err) }
      const data = {
        image: this.state.image,
        userInfo: {
          name: this.state.name,
          email: this.state.email,
          geo: latLng
        }
      }
      console.log(data);
      PeopleService.add(data);

    })
  }

  render() {
    const inputProps = {
      value: this.state.address,
      placeholder: 'Origin (city or country)*',
      onChange: this.onAddressChange
    };
    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'c-autocomplete'

    }

    return (
      <form onSubmit={(e) => this.handleFormSubmit(e)}>
        <div className="container">

          <br />
          <img className="c-welcome" alt="Welcome" src={WelcomeImage} />
          <br />
          <div className="form-group">
            <input name="name" placeholder="What's your name?*" value={this.state.name} onChange={this.onChange} className="form-control" type="text" />
          </div>
          <div className="form-group">
            <PlacesAutocomplete classNames={cssClasses} inputProps={inputProps} />
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Email" autoComplete="off" autoCapitalize="off" autoCorrect="off" type="email" name="email" value={this.state.email} onChange={this.onChange} />
          </div>

          <div className="form-group">
            <label className="btn btn-default btn-file">
              Take a photo!
   <input id="myFileInput" type="file" accept="image/*;capture=camera" name="image" value={this.state.imageValue} onChange={this.onFileChange} className="hidden" />
            </label>

          </div>

          <div className="form-group">
            <Button bsStyle="primary" type="submit">SEND</Button>
          </div>
        </div>

        <Modal show={this.state.showModal} message="Thank you!" continueHandler={this.reset.bind(this)}></Modal>

      </form>
    )
  }
}

export default Registration;