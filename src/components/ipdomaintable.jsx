import ButtonGeneral from '../components/buttons';
import Table from 'react-bootstrap/Table';

const IPDomainTable = (props) => {

    let {listIPDomain, onEditIPDomain, onDeleteIPDomain} = props;

    const onClickEditBtn = (ipdomainItem) => {
        onEditIPDomain(ipdomainItem);
    }

    const onClickDeleteBtn = (ipdomainItem) => {
        onDeleteIPDomain(ipdomainItem);
    }

    return (
        <div className="ip-domain-table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>IP Address</th>
                        <th>Domain name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listIPDomain && listIPDomain.length > 0 && listIPDomain.map((ipdomainItem, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ipdomainItem?.origin}</td>
                            <td>{ipdomainItem?.target}</td>
                            <td>
                                <ButtonGeneral type="warning" content="Update" onClickBtn={() => onClickEditBtn(ipdomainItem)}/>
                                <ButtonGeneral type="danger" content="Delete" onClickBtn={() => onClickDeleteBtn(ipdomainItem)}/>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default IPDomainTable;

