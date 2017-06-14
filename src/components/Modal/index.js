import React, { PropTypes } from 'react';
import { Modal as BtModal, Button } from 'react-bootstrap';

const Modal = (props) => {
    return <BtModal show={props.show} autoFocus={true}>
        <BtModal.Body>
            {props.message}
        </BtModal.Body>
        <BtModal.Footer>
        <Button bsStyle="primary" onClick={props.continueHandler}>Continue</Button>
        </BtModal.Footer>
    </BtModal>;
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  continueHandler: PropTypes.func.isRequired
};

export default Modal;