import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonGeneral from './buttons';
import { useEffect, useState } from 'react';
import ipdomainService from '../services/ipdomainService';
import variables from '../variables';
import regexes from '../utils/regexes.js';
import matchRegexes from '../utils/matchRegexes';

const ModalIPDomain = (props) => {

    let { showModal, handleClose, typeModal, ipDomainEdit, refreshData } = props;

    let [ipAddress, setIPAddress] = useState("");
    let [domainName, setDomainName] = useState("");

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
    const onHandleIPDomain = async(type) => {
        if(typeModal === "delete") {
            try {
                let response = await ipdomainService.deleteIPDomain(ipDomainEdit?._id);
                if(response && response.status === variables.SUCCESS_DELETE) {
                    alert("Delete successfully!");
                    refreshData();
                }
            } catch (error) {
                alert("Error delete node and target: ", error);
            }
            handleClose();
        }else {
            if(!ipAddress || !domainName) {
                alert("Missing ip or domain name value");
            }else if(matchRegexes.matchesAnyRegex(ipAddress, regexes.blackList)) {
                alert("Node is invalid. Please try another one!");
            }else if(matchRegexes.matchesAnyRegex(domainName, regexes.blackList)) {
                alert("Target is invalid. Please try another one!");
            }
            else {
                if(type === "add") {
                    try {
                        let response = await ipdomainService.addNewIPDomain(ipAddress, domainName);
                        if(response && response.status === variables.SUCCESS_ADD) {
                            alert("Add new node and target successfully!");
                            handleClose();
                            refreshData();
                        }
                    } catch (error) {
                        if(error.response.status === variables.FAIL) {
                            alert(error.response.data.msg);
                        }
                    }
                }else if(type === "edit") {
                    try {
                        let response = await ipdomainService.updateIPDomain(ipDomainEdit?._id, ipAddress, domainName);
                        if(response && response.status === variables.SUCCESS_EDIT) {
                            alert("Update info successfully!");
                            handleClose();
                            refreshData();
                        }
                    } catch (error) {
                        if(error.response.status === variables.FAIL) {
                            alert(error.response.data.msg);
                        }
                    }
                }
            }
        }
    }

    return (
        <Modal show={showModal} onHide={() => handleClose()} className='modal-general'>
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
                        {/* Can toi uu */}
                        <Form.Label>Node</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your node"
                            onChange={(e) => setIPAddress(e.target.value)}
                            value={ipAddress}
                        />
                        <Form.Label>Target</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your target"
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
                <ButtonGeneral type="primary" content="Add" onClickBtn={() => onHandleIPDomain("add")}/>
            : typeModal && typeModal !== "" && typeModal === "edit" ? 
                <ButtonGeneral type="warning" content="Update" onClickBtn={() => onHandleIPDomain("edit")}/>
            : typeModal && typeModal !== "" && typeModal === "delete" ?
                <ButtonGeneral type="danger" content="Delete" onClickBtn={() => onHandleIPDomain("delete")}/>
            : ""
            } 
            </Modal.Footer>
        </Modal>
    )
}

export default ModalIPDomain;