import React from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from "react-icons/io";

import './Modal.scss';

const Modal = ({ isShowing, hide, children }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog" >
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">
                <IoMdClose />
            </span>
          </button>
        </div>
        <p>
            {children}
        </p>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;