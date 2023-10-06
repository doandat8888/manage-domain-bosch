import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = (props) => {

    const {onChangeSearchBarTxt} = props;

    const changeSearchBarTxt = (searchValue) => {
        onChangeSearchBarTxt(searchValue);
    }

    return (
        <InputGroup className="mb-3 search-bar">
            <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder='Search by node...'
                onChange={(e) => changeSearchBarTxt(e.target.value)}
            />
        </InputGroup>
    )
}

export default SearchBar;