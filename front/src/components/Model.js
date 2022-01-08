import React from 'react'
import {Modal} from 'react-bootstrap'

const ModelCom = ({open=true,setOpen=()=>{},children}) => {
    return (
      <div>
        <Modal
          size="lg"
          show={open}
          onHide={() => setOpen(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Edit User 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          
        </Modal>
      </div>
    );
}

export default ModelCom
