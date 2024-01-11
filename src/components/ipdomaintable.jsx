import { useState } from 'react';
import ButtonGeneral from '../components/buttons';
import Table from 'react-bootstrap/Table';
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { GoCopy } from "react-icons/go";
import { Alert, Snackbar } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IPDomainTable = (props) => {

    // eslint-disable-next-line react/prop-types
    let {listIPDomain, onEditIPDomain, onDeleteIPDomain} = props;
    const [copied, setCopied]  = useState(false);

    const onClickEditBtn = (ipdomainItem) => {
        onEditIPDomain(ipdomainItem);
    }

    const onClickDeleteBtn = (ipdomainItem) => {
        onDeleteIPDomain(ipdomainItem);
    }

    const onGotoLink = (originStr) => {
        window.location.href=`${import.meta.env.VITE_APP_BACKEND_DEPLOY_URL}${originStr}`
    }

    const onCopyUrl = (link) => {
        const el = document.createElement("input");
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        toast.success("Copied to clipboard");
    }

    return (
        <div className="ip-domain-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width: "5%"}}>No.</th>
                        <th>Node</th>
                        <th>Target</th>
                        <th>URL</th>
                        <th style={{width: "10%"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listIPDomain && listIPDomain.length > 0 && listIPDomain.map((ipdomainItem, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><div className='origin-container'><div className='origin'>{ipdomainItem?.origin}</div></div></td>
                            <td><div className='target'>{ipdomainItem?.target}</div></td>
                            <td><div style={{display: "flex"}}><a style={{color: "black"}} href={`${import.meta.env.VITE_APP_BACKEND_DEPLOY_URL}${ipdomainItem?.origin}`} className='url'>{import.meta.env.VITE_APP_BACKEND_DEPLOY_URL}{ipdomainItem?.origin}</a> <GoCopy onClick={() => onCopyUrl(import.meta.env.VITE_APP_BACKEND_DEPLOY_URL + ipdomainItem?.origin)} style={{marginLeft: "2px", cursor: "pointer"}} /></div></td>
                            <td>
                                <ButtonGeneral type="warning" content={<BiEditAlt style={{color: "white"}} />} onClickBtn={() => onClickEditBtn(ipdomainItem)}/>
                                <ButtonGeneral type="danger" content={<BsTrash />} onClickBtn={() => onClickDeleteBtn(ipdomainItem)}/>
                                <a href={`${import.meta.env.VITE_APP_BACKEND_DEPLOY_URL}${ipdomainItem?.origin}`} target="_blank" rel="noopener noreferrer"><ButtonGeneral type="primary" content={<CiShare1 style={{color: "white"}} />}/></a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer style={{fontSize: "14px"}}/>
        </div>
    )
}

export default IPDomainTable;

