import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { Modal, Button } from 'react-bootstrap';
import PeopleService from './../../services/people';


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.onChange = this.onChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  getInitialState() {
    return { address: '', name: '', email: '', imageValue:'', image: null, showModal: false };
  }

  closeModal() {
    this.setState({ showModal: false });
    // this.setState(this.getInitialState());
  }

  openModal() {
    this.setState({ showModal: true }); 
  }


  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(this.state)

    this.setState({
      [name]: value
    });
  }

  onFileChange(event) {
    this.setState({
      imageValue: event.target.value,
      image: (event.target.files && event.target.files.length > 0) ? event.target.files[0]: null
    })
  }

  onAddressChange(value) {
    this.setState({
      address: value
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
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
      onChange: this.onAddressChange,
      className: 'form-control'
    }


    return (
      <form onSubmit={(e) => this.handleFormSubmit(e)}>
        <br /><br />
        <div className="container">
          <div className="form-group">
            <label>Name*</label>
            <input name="name" value={this.state.name} onChange={this.onChange} className="form-control" type="text" />
          </div>
          <div className="form-group">
            <label>Location*</label>
            <PlacesAutocomplete inputProps={inputProps} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.onChange}  />
          </div>

          <div className="form-group">
            <label>Image</label>
            <input id="myFileInput" type="file" accept="image/*;capture=camera" name="image" value={this.state.imageValue} onChange={this.onFileChange} />
          </div>

          <div className="form-group">
            <Button bsStyle="primary" type="submit">Submit</Button>
          </div>
        </div>
        <Modal show={this.state.showModal}>
          <Modal.Body>
            Thank you!
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={() => { this.closeModal(); }}>Continue</Button>
          </Modal.Footer>
        </Modal>

      </form>
    )
  }
}

export default Registration;