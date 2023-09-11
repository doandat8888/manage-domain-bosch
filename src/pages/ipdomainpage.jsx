import IPDomainTable from "../components/ipdomaintable";
import ButtonGeneral from "../components/buttons";
import SearchBar from "../components/searchbar";
import { useEffect, useState } from "react";
import IpdomainService from "../services/ipdomainService";
import { isArray, isObject } from "lodash";
import ModalIPDomain from "../components/modal";
import Header from "../components/header";

const IPDomainPage = () => {

    const [listIPDomain, setListIPDomain] = useState([]);
    const [idDomainEditItem, setIpDomainEditItem] = useState({});
    const [ipValue, setIpValue] = useState("");
    //Modal
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("");

    useEffect(() => {
        getAllIPDomain();
    }, []);

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

    const filterIPDomain = ipValue && listIPDomain.length > 0 ? listIPDomain.filter(item => item.origin.includes(ipValue)) : listIPDomain;
   

    return (
        <div className="ip-domain-page">
            <Header />
            <div className="body">
                <div className="title">
                    <h1>MANAGE DOMAIN</h1>
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
            
        </div>
    )
}

export default IPDomainPage;