import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonGeneral from './buttons';
import { useEffect, useState } from 'react';
import IpdomainService from '../services/ipdomainService';
import Variables from '../variables';
import Regexes from '../utils/regexes.js';
import MatchRegexes from '../utils/matchRegexes';
import ModalPassword from './modalPassword';

const ModalIPDomain = (props) => {

    let { showModal, handleClose, typeModal, ipDomainEdit, refreshData } = props;

    let [ipAddress, setIPAddress] = useState("");
    let [domainName, setDomainName] = useState("");
    let [showModalPassword, setShowModalPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false);

    const handleCloseModal = () => {
        setIPAddress("");
        setDomainName("");
        setEnableSubmit(false);
        handleClose();
    }

    useEffect(() => {
        if(ipAddress !== "" && domainName !== "") {
            setEnableSubmit(true);
        }else {
            setEnableSubmit(false);
        }
    }, [ipAddress, domainName])

    useEffect(() => {
        if(typeModal && typeModal === "edit" && ipDomainEdit) {
            setIPAddress(ipDomainEdit?.origin);
            setDomainName(ipDomainEdit?.target);
        }else { //Truong hop add
            setIPAddress("");
            setDomainName("");
        }
    }, [typeModal, ipDomainEdit])

    //Sau khi nguoi dung click vao button add hoac edit
    const onHandleIPDomain = async() => {
        if(password === ""){
            alert("Please enter password");
        }else {
            if(typeModal === "delete") {
                try {
                    let response = await IpdomainService.deleteIPDomain(ipDomainEdit?._id, password);
                    if(response && response.status === Variables.SUCCESS_DELETE) {
                        alert("Delete successfully!");
                        handleCloseModal();
                        refreshData();
                        window.location.href = import.meta.env.VITE_APP_URL;
                    }
                } catch (error) {
                    alert(error.response.data.msg);
                }
                handleCloseModal();
                onCloseModalPassword();
            }else {
                if(!ipAddress || !domainName) {
                    alert("Missing ip or domain name value");
                }else if(MatchRegexes.matchesAnyRegex(ipAddress, Regexes.blackList)) {
                    alert("Node is invalid. Please try another one!");
                }else if(MatchRegexes.matchesAnyRegex(domainName, Regexes.blackList)) {
                    alert("Target is invalid. Please try another one!");
                }
                else {
                    if(typeModal === "add") {
                        try {
                            let response = await IpdomainService.addNewIPDomain(ipAddress, domainName, password);
                            if(response && response.status === Variables.SUCCESS_ADD) {
                                alert("Add new node and target successfully!");
                                handleCloseModal();
                                refreshData();
                                onCloseModalPassword();
                                window.location.href = import.meta.env.VITE_APP_URL;
                            }
                        } catch (error) {
                            alert(error.response.data.msg);
                        }
                    }else if(typeModal === "edit") {
                        try {
                            let response = await IpdomainService.updateIPDomain(ipDomainEdit?._id, ipAddress, domainName, password);
                            if(response && response.status === Variables.SUCCESS_EDIT) {
                                alert("Update info successfully!");
                                handleCloseModal();
                                refreshData();
                                onCloseModalPassword();
                                window.location.href = import.meta.env.VITE_APP_URL;
                            }
                        } catch (error) {
                            alert(error.response.data.msg);
                        }
                    }
                }
            }
        }
    }

    const onCloseModalPassword = () => {
        setShowModalPassword(false);
        setPassword("");
    }

    return (
        <Modal show={showModal} onHide={() => handleCloseModal()} className='modal-general'>
            <Modal.Header closeButton>
                <Modal.Title>
                    {/* Can toi uu */}
                    {typeModal !== "" && typeModal === "add" ? "Add new node and target" 
                    : typeModal !== "" && typeModal === "edit" ? "Update node & target info" 
                    : typeModal !== "" && typeModal === "delete" ? "Confirm delete" : ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {typeModal && typeModal !== "" && typeModal !== "delete" ? 
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div style={{display: "flex"}}>
                            <Form.Label>Node</Form.Label>
                            <p style={{color: "red", fontSize: "16px", marginLeft: "2px"}}>*</p>
                        </div>
                        <Form.Control
                            type="text"
                            placeholder="Enter node"
                            onChange={(e) => setIPAddress(e.target.value)}
                            value={ipAddress}
                        />
                        <div style={{display: "flex"}}>
                            <Form.Label>Target</Form.Label>
                            <p style={{color: "red", fontSize: "16px", marginLeft: "2px"}}>*</p>
                        </div>
                        <Form.Control
                            type="text"
                            placeholder="Enter target"
                            onChange={(e) => setDomainName(e.target.value)}
                            value={domainName}
                        />
                    </Form.Group>
                </Form>
                :<p style={{fontSize: '1.4rem'}}>Do you want to delete this item ?</p>}
            </Modal.Body>
            <Modal.Footer>
            <ButtonGeneral type="secondary" content="Close" onClickBtn={handleClose}></ButtonGeneral>
            
            {typeModal && typeModal !== "" && typeModal === "add" ? 
                <ButtonGeneral enable={enableSubmit} type="primary" content="Add" onClickBtn={() => setShowModalPassword(true)}/>
            : typeModal && typeModal !== "" && typeModal === "edit" ? 
                <ButtonGeneral enable={enableSubmit} type="warning" content="Update" onClickBtn={() => setShowModalPassword(true)}/>
            : typeModal && typeModal !== "" && typeModal === "delete" ?
                <ButtonGeneral enable={true} type="danger" content="Delete" onClickBtn={() => setShowModalPassword(true)}/>
            : ""
            } 
            </Modal.Footer>
            <ModalPassword password={password} onSetPassword={(value) => setPassword(value)} showModal={showModalPassword} handleClose={onCloseModalPassword} onHandleIpDomain={onHandleIPDomain}/>
        </Modal>
    )
}

export default ModalIPDomain;