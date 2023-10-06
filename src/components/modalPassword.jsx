import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonGeneral from './buttons';

const ModalPassword = (props) => {

    const {showModal, handleClose, onHandleIpDomain, onSetPassword, password} = props;
    const [enableBtn, setEnableBtn] = useState(false);

    useEffect(() => {
        if(password) {
            setEnableBtn(true);
        }else {
            setEnableBtn(false);
        }
    }, [password]);

    return (
        <Modal show={showModal} onHide={() => handleClose()} className='modal-general'>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p>Input password</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => onSetPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGeneral type="secondary" content="Close" onClickBtn={handleClose}></ButtonGeneral>
                <ButtonGeneral enable={enableBtn} type="primary" content="Save" onClickBtn={() => onHandleIpDomain(password)}/> 
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPassword