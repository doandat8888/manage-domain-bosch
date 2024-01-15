import IPDomainTable from '../components/ipdomaintable'
import ButtonGeneral from '../components/buttons'
import SearchBar from '../components/searchbar'
import { useCallback, useEffect, useState } from 'react'
import IpdomainService from '../services/ipdomainService'
import { isArray, isObject } from 'lodash'
import _ from 'lodash'
import ModalIPDomain from '../components/modal'
import { Pagination } from '@mui/material'
import ipdomainService from '../services/ipdomainService'
import { TbHelpCircle } from 'react-icons/tb'
import GuidelineModal from '../components/guidelineModal'

const IPDomainPage = () => {
    const [listIPDomain, setListIPDomain] = useState([])
    const [idDomainEditItem, setIpDomainEditItem] = useState({})
    const [ipValue, setIpValue] = useState('')
    //Modal
    const [showModal, setShowModal] = useState(false)
    const [typeModal, setTypeModal] = useState('')
    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [showGuideModal, setShowGuideModal] = useState(false)
    const limit = 10

    //let filterIPDomain = ipValue && listIPDomain.length > 0 ? listIPDomain.filter(item => item.origin.includes(ipValue)) : ipDomainListByPage;

    useEffect(() => {
        getAllIPDomain()
    }, [ipValue])

    const getProxyByOrigin = useCallback(
        async (ipValue) => {
            await ipdomainService.getIpDomainServiceByName(limit, currentPage, ipValue).then(({ data }) => {
                if (data && data.data && data.data.length > 0) {
                    setListIPDomain(data.data)
                    setTotalPage(Math.ceil(data.count / limit))
                } else {
                    setListIPDomain([])
                    setTotalPage(0)
                }
            })
        },
        [currentPage]
    )

    useEffect(() => {
        const ipValue = localStorage.getItem('name')
        if (ipValue) {
            getProxyByOrigin(ipValue)
        } else {
            getAllIPDomain()
            getTotalPage()
        }
    }, [currentPage, getProxyByOrigin])

    console.log('total page: ', totalPage)

    const deb = _.debounce((value) => {
        getProxyByOrigin(value)
        setCurrentPage(1)
        localStorage.setItem('name', value)
    }, 1000)

    const getTotalPage = async () => {
        await ipdomainService.getAllIPDomain(limit, currentPage).then(({ data }) => {
            if (data && data.data && data.data.length > 0) {
                setTotal(data.count)
            }
        })
    }

    const getAllIPDomain = async () => {
        try {
            let response = await IpdomainService.getAllIPDomain(limit, currentPage)
            if (response && isArray(response.data.data)) {
                setListIPDomain(response.data.data)
                setTotalPage(Math.ceil(response.data.count / limit))
                console.log('total page: ', totalPage)
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const onSearchIPDomain = (ipValue) => {
        deb(ipValue)
    }

    const onClickAddBtn = () => {
        setShowModal(true)
        setTypeModal('add')
    }

    const onClickGuideBtn = () => {
        setShowGuideModal(true)
    }

    //Modal
    const closeModal = () => {
        setShowModal(false)
        setIpDomainEditItem({})
    }

    const onEditIPDomain = (ipDomainEdit) => {
        if (ipDomainEdit && isObject(ipDomainEdit)) {
            setIpDomainEditItem(ipDomainEdit)
            setTypeModal('edit')
        }
        setShowModal(true)
    }

    const onDeleteIPDomain = (ipDomainDelete) => {
        if (ipDomainDelete && isObject(ipDomainDelete)) {
            setIpDomainEditItem(ipDomainDelete)
            setTypeModal('delete')
        }
        setShowModal(true)
    }

    return (
        <div className='ip-domain-page'>
            <div className='body'>
                <div className='title'>
                    <h1>MANAGE PROXY</h1>
                </div>
                <div className='search-area'>
                    <div className='search-bar'>
                        <SearchBar onChangeSearchBarTxt={onSearchIPDomain} />
                    </div>
                    <div className='guide-btn'>
                        <ButtonGeneral
                            icon={<TbHelpCircle className='text-xl' />}
                            type='secondary'
                            content='Guide'
                            onClickBtn={onClickGuideBtn}
                        />
                    </div>
                    <div className='add-btn'>
                        <ButtonGeneral type='primary' content='Add' onClickBtn={onClickAddBtn} />
                    </div>
                </div>
                <IPDomainTable
                    listIPDomain={listIPDomain}
                    onEditIPDomain={onEditIPDomain}
                    onDeleteIPDomain={onDeleteIPDomain}
                />
                <ModalIPDomain
                    showModal={showModal}
                    handleClose={closeModal}
                    typeModal={typeModal}
                    refreshData={getAllIPDomain}
                    ipDomainEdit={idDomainEditItem}
                />
                <GuidelineModal showModal={showGuideModal} handleClose={() => setShowGuideModal(false)} />
            </div>
            <Pagination
                className='pagination'
                classes={{
                    ul: {
                        '& .MuiPaginationItem-root': {
                            fontSize: '16px',
                        },
                    },
                }}
                style={{
                    backgroundColor: 'white',
                }}
                onChange={(event, value) => setCurrentPage(value)}
                count={totalPage}
            />
        </div>
    )
}

export default IPDomainPage
