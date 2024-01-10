import IPDomainTable from "../components/ipdomaintable";
import ButtonGeneral from "../components/buttons";
import SearchBar from "../components/searchbar";
import { useEffect, useState } from "react";
import IpdomainService from "../services/ipdomainService";
import { isArray, isObject } from "lodash";
import ModalIPDomain from "../components/modal";
import { Pagination } from '@mui/material';
import ipdomainService from "../services/ipdomainService";

const IPDomainPage = () => {

    const [listIPDomain, setListIPDomain] = useState([]);
    const [idDomainEditItem, setIpDomainEditItem] = useState({});
    const [ipValue, setIpValue] = useState("");
    //Modal
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("");
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [ipDomainListByPage, setIpDomainListByPage] = useState([]);
    const limit = 4;

    const filterIPDomain = ipValue && listIPDomain.length > 0 ? listIPDomain.filter(item => item.origin.includes(ipValue)) : ipDomainListByPage;

    useEffect(() => {
        getAllIPDomain();
    }, [ipValue]);

    useEffect(() => {
        if(listIPDomain) {
            let totalPages = 0;
            if(filterIPDomain.length === ipDomainListByPage.length) {
                if(ipValue) {
                    totalPages = Math.ceil(filterIPDomain.length / limit);
                }else {
                    totalPages = Math.ceil(listIPDomain.length / limit);
                }
            }else {
                if(ipValue) {
                    totalPages = Math.ceil(filterIPDomain.length / limit);
                }else {
                    totalPages = Math.ceil(listIPDomain.length / limit);
                }
            }
            setTotalPage(totalPages);
        }
    }, [listIPDomain, ipValue, ipDomainListByPage]);

    useEffect(() => {
        if(listIPDomain) {
            getIpDomainListByPage();
        }
    }, [currentPage])

    const getIpDomainListByPage = async() => {
        const response = await ipdomainService.getIpDomainServiceByPage(limit, currentPage);
        if(response && response.status === 200) {
            setIpDomainListByPage(response.data);
        }
    }

    const getAllIPDomain = async() => {
        try {
            let response = await IpdomainService.getAllIPDomain();
            if(response && isArray(response.data)) {
                setListIPDomain(response.data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const onSearchIPDomain = (ipValue) => {
        setIpValue(ipValue);
    }

    const onClickAddBtn = () => {
        setShowModal(true);
        setTypeModal("add");
    }

    //Modal
    const closeModal = () => {
        setShowModal(false);
        setIpDomainEditItem({});
    }

    const onEditIPDomain = (ipDomainEdit) => {
        if(ipDomainEdit && isObject(ipDomainEdit)) {
            setIpDomainEditItem(ipDomainEdit);
            setTypeModal("edit");
        }
        setShowModal(true);
    }

    const onDeleteIPDomain = (ipDomainDelete) => {
        if(ipDomainDelete && isObject(ipDomainDelete)) {
            setIpDomainEditItem(ipDomainDelete);
            setTypeModal("delete");
        }
        setShowModal(true);
    }

    
   
    return (
        <div className="ip-domain-page">
            <div className="body">
                <div className="title">
                    <h1>MANAGE PROXY</h1>
                </div>
                <div className="search-area">
                    <div className="search-bar">
                        <SearchBar onChangeSearchBarTxt={onSearchIPDomain}/>
                    </div>
                    <div className="add-btn">
                        <ButtonGeneral type="primary" content="Add" onClickBtn={onClickAddBtn}/>
                    </div>
                </div>
                <IPDomainTable listIPDomain={filterIPDomain} onEditIPDomain={onEditIPDomain} onDeleteIPDomain={onDeleteIPDomain}/>
                <ModalIPDomain showModal={showModal} handleClose={closeModal} typeModal={typeModal} refreshData={getAllIPDomain} ipDomainEdit={idDomainEditItem}/>
            </div>
            <Pagination className="pagination" style={{position: "fixed", backgroundColor: "white", visibility: `${listIPDomain.length <= limit ? 'hidden' : ''}`}} onChange={(event, value) => setCurrentPage(value)} count={totalPage}/>
        </div>
    )
}

export default IPDomainPage;